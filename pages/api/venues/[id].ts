import HTTPResponseError from 'lib/HTTPResponseError';
import type { VenueDocument } from 'models/VenueModel';
import VenueController from 'controllers/VenueController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<VenueDocument>>,
) => {
  // Get the query id, if it's for some reason an array of ids we select the first.
  const query = req.query;
  const id = typeof query.id === 'string' ? query.id : query.id[0];
  const controller = new VenueController();
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await controller.get(id));
      case 'DELETE':
        return res.json(await controller.delete(id));
      case 'PUT':
        return res.json(await controller.update(id, req.body));
      default:
        return res
          .status(405)
          .setHeader('Allow', ['GET', 'DELETE', 'PUT'])
          .end();
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
