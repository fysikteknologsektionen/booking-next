import dbConnect from '@lib/dbConnect';
import type { VenueDocument } from '@models/VenueModel';
import VenueModel from '@models/VenueModel';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse<VenueDocument>) => {
  if (req.method === 'POST') {
    await dbConnect();
    const venue = new VenueModel({ ...req.body });
    await venue.save();
    return res.json(venue);
  }
  return res.status(405).setHeader('Allow', ['POST']).end();
};

export default handler;
