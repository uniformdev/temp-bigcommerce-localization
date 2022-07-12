import { GetStaticProps } from 'next';
import Link from 'next/link';
import { canvasClient } from '../lib/canvasClient';

type ListProps = { paths: Array<{ id: string; name?: string; slug: string }> };

export default function Home({ paths }: ListProps) {
  return (
    <div>
      {paths.length <= 0 ? (
        <h1>No Compositions with a slug found in your project.</h1>
      ) : (
        <>
          <h1>Compositions in your project</h1>
          <p>Open each one to see raw data of post-enhanced composition.</p>
          <ul>
            {paths?.map((path) => (
              <li key={path.id}>
                {path.name} composition:{' '}
                <Link href={path.slug}>
                  <a>UI view</a>
                </Link>{' '}
                |{' '}
                <Link href={`/api/compositions/${path.id}`}>
                  <a>API view</a>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps<ListProps> = async () => {
  const pages = await canvasClient?.getCompositionList();
  const paths = pages
    ? pages.compositions.map((comp) => ({
        id: comp.composition._id!,
        name: comp.composition._name,
        slug: comp.composition._slug! ?? '',
      }))
    : [];
  return {
    props: {
      paths,
      fallback: false,
    },
  };
};
