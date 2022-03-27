import VenueController from 'controllers/VenueController';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import handleApiError from 'lib/handleApiError';
import type { LeanDocument } from 'mongoose';
import type { VenueDocument } from 'models/VenueModel';

type Response = LeanDocument<VenueDocument> | LeanDocument<VenueDocument>[] | string;

const controller = new VenueController();

const handler = nc<NextApiRequest, NextApiResponse<Response>>({
  onError: handleApiError,
  onNoMatch: (req, res) => {
    res
      .status(405)
      .setHeader('Allow', ['GET', 'POST'])
      .send('Method Not Allowed');
  },
})
  .get(async (req, res) => {
    res.json(await controller.index());
  })
  .post(async (req, res) => {
    res.json(await controller.create(req.body));
  });

export default handler;
