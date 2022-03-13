import dbConnect from '@lib/dbConnect';
import HTTPResponseError from '@lib/HTTPResponseError';
import type { VenueDocument } from '@models/VenueModel';
import VenueModel from '@models/VenueModel';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getVenue = async (id: string) => {
  await dbConnect();
  const venue = await VenueModel.findById(id).lean().exec();
  if (!venue) {
    throw new HTTPResponseError(404, `Venue with id '${id}' not found.`);
  }
  return venue;
};

export const deleteVenue = async (id: string) => {
  await dbConnect();
  const venue = await VenueModel.findByIdAndDelete(id).lean().exec();
  if (!venue) {
    throw new HTTPResponseError(404, `Venue with id '${id}' not found.`);
  }
  return venue;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<VenueDocument>>,
) => {
  // Get the query id, if it's for some reason an array of ids we select the first.
  const query = req.query;
  const id = typeof query.id === 'string' ? query.id : query.id[0];
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await getVenue(id));
      case 'DELETE':
        return res.json(await deleteVenue(id));
      default:
        return res.status(405).setHeader('Allow', ['GET', 'DELETE']).end();
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
