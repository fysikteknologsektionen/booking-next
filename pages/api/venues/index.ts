import dbConnect from '@lib/dbConnect';
import type { Venue, VenueDocument } from '@models/VenueModel';
import VenueModel from '@models/VenueModel';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const createVenue = async (body: Venue) => {
  await dbConnect();
  const venue = new VenueModel({ ...body });
  await venue.save();
  return venue;
};

export const indexVenues = async (query: {
  [key: string]: string | string[];
}) => {
  console.log(query);
  await dbConnect();
  const venues = await VenueModel.find().lean().exec();
  return venues;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
  LeanDocument<VenueDocument> | LeanDocument<VenueDocument>[]
  >,
) => {
  try {
    switch (req.method) {
      case 'POST':
        return res.json(await createVenue(req.body));
      case 'GET':
        return res.json(await indexVenues(req.query));
      default:
        return res.status(405).setHeader('Allow', ['GET', 'POST']).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export default handler;
