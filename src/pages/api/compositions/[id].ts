import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { enhance } from '@uniformdev/canvas';
import { canvasClient } from '../../../lib/canvasClient';
import { getEnhancers } from '../../../lib/enhancers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, metafields } = req.query;
  const { composition } = await canvasClient.getCompositionById({ compositionId: id as string });
  const context = { locale: metafields } as GetServerSidePropsContext;
  // running the enhance function, with will return post-enhanced composition
  const enhancers = await getEnhancers();
  await enhance({
    composition,
    enhancers,
    context,
  });

  // returning the post-enhanced composition in response
  res.end(JSON.stringify(composition));
}
