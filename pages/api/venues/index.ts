import dbConnect from '@lib/dbConnect';
import getWhitelistedEntries from '@lib/getWhitelistedEntries';
import type { Venue, VenueDocument } from '@models/VenueModel';
import VenueModel from '@models/VenueModel';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const createVenue = async (body: Record<string, any>) => {
  const data = getWhitelistedEntries<Venue>(body, [
    'name',
    'description',
    'managers',
    'enabled',
  ]);
  await dbConnect();
  const venue = new VenueModel(data);
  await venue.save();
  return venue;
};

export const indexVenues = async () => {
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
        return res.json(await indexVenues());
      default:
        return res.status(405).setHeader('Allow', ['GET', 'POST']).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export default handler;
