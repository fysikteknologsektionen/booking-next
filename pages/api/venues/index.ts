import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ApiRouter from 'lib/ApiRouter';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
  LeanDocument<VenueDocument> | LeanDocument<VenueDocument>[]
  >,
) => {
  const controller = new VenueController();
  const router = new ApiRouter(controller, res, ['GET', 'POST']);

  switch (req.method) {
    case 'GET':
      await router.index();
      break;
    case 'POST':
      await router.create(req.body);
      break;
    default:
      router.default();
  }
};

export default handler;
