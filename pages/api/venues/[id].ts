import VenueController from 'controllers/VenueController';
import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import handleApiError from 'lib/handleApiError';
import type { VenueDocument } from 'models/VenueModel';
import type { LeanDocument } from 'mongoose';
import parseId from 'lib/middlewares/parseId';

type Response = LeanDocument<VenueDocument> | string;

const controller = new VenueController();

const handler = nc<NextApiRequest, NextApiResponse<Response>>({
  onError: handleApiError,
  onNoMatch: (req, res) => {
    res
      .status(405)
      .setHeader('Allow', ['GET', 'DELETE', 'PUT'])
      .send('Method Not Allowed');
  },
})
  .use(parseId)
  .get<{ id: string }>(async (req, res) => {
  res.json(await controller.get(req.id));
})
  .delete<{ id: string }>(async (req, res) => {
  res.json(await controller.delete(req.id));
})
  .put<{ id: string }>(async (req, res) => {
  res.json(await controller.update(req.id, req.body));
});

export default handler;
