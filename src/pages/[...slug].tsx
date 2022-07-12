import React from 'react';
import { GetStaticPropsContext } from 'next';
import {
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
  RootComponentInstance,
} from '@uniformdev/canvas';
import { Composition, Slot } from '@uniformdev/canvas-react';

import { Visualizer } from '../components/Visualizer';
import { canvasClient } from '../lib/canvasClient';
import { getEnhancers } from '../lib/enhancers';

export default function Home({ composition }: { preview?: string; composition: RootComponentInstance }) {
  return (
    <div>
      <Composition
        data={composition}
        resolveRenderer={() => {
          return Visualizer;
        }}
      >
        <main>
          <Slot name="main" />
        </main>
      </Composition>
      <h2>Raw composition</h2>
      <pre>{JSON.stringify(composition, null, 2)}</pre>
    </div>
  );
}

export async function getServerSideProps(context: GetStaticPropsContext) {
  const { slug } = context?.params || {};
  const slugString = Array.isArray(slug) ? slug.join('/') : slug;
  const { preview } = context;

  const { composition } = await canvasClient.getCompositionBySlug({
    slug: `/${slugString}`,
    state: preview ? CANVAS_DRAFT_STATE : CANVAS_PUBLISHED_STATE,
  });

  const enhancers = await getEnhancers();
  await enhance({ composition, enhancers, context });

  return {
    props: {
      composition,
      preview: preview ?? false,
    },
  };
}
