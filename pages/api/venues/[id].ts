import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ApiRouter from 'lib/ApiRouter';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<VenueDocument>>,
) => {
  // Get the query id, if it's for some reason an array of ids we select the first.
  const query = req.query;
  const id = typeof query.id === 'string' ? query.id : query.id[0];
  const controller = new VenueController();
  const router = new ApiRouter(controller, res, ['GET', 'DELETE', 'PUT']);

  switch (req.method) {
    case 'GET':
      await router.get(id);
      break;
    case 'DELETE':
      await router.delete(id);
      break;
    case 'PUT':
      await router.update(id, req.body);
      break;
    default:
      router.default();
  }
};

export default handler;
