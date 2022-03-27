import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import handleApiError from 'lib/handleApiError';
import type { LeanDocument } from 'mongoose';
import parseId from 'lib/middlewares/parseId';
import type { UserDocument } from 'models/UserModel';
import UserController from 'controllers/UserController';

type Response = LeanDocument<UserDocument> | string;

const controller = new UserController();

const handler = nc<NextApiRequest, NextApiResponse<Response>>({
  onError: handleApiError,
  onNoMatch: (req, res) => {
    res
      .status(405)
      .setHeader('Allow', ['GET', 'DELETE'])
      .send('Method Not Allowed');
  },
})
  .use(parseId)
  .get<{ id: string }>(async (req, res) => {
  res.json(await controller.get(req.id));
})
  .delete<{ id: string }>(async (req, res) => {
  res.json(await controller.delete(req.id));
});

export default handler;
