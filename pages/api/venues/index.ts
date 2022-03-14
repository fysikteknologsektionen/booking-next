import HTTPResponseError from 'lib/HTTPResponseError';
import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
  LeanDocument<VenueDocument> | LeanDocument<VenueDocument>[]
  >,
) => {
  const controller = new VenueController();
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await controller.index());
      case 'POST':
        return res.json(await controller.create(req.body));
      default:
        return res.status(405).setHeader('Allow', ['GET', 'POST']).end();
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error);
    }
    if (error instanceof HTTPResponseError) {
      return res.status(error.statusCode).end();
    }
    return res.status(500).end();
  }
};

export default handler;
