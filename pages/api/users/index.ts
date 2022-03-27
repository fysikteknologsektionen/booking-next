import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import handleApiError from 'lib/handleApiError';
import type { LeanDocument } from 'mongoose';
import UserController from 'controllers/UserController';
import type { UserDocument } from 'models/UserModel';

type Response = LeanDocument<UserDocument>[] | string;

const controller = new UserController();

const handler = nc<NextApiRequest, NextApiResponse<Response>>({
  onError: handleApiError,
  onNoMatch: (req, res) => {
    res.status(405).setHeader('Allow', ['GET']).send('Method Not Allowed');
  },
}).get(async (req, res) => {
  res.json(await controller.index());
});

export default handler;
