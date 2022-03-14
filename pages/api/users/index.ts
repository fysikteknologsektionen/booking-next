import HTTPResponseError from 'lib/HTTPResponseError';
import type { UserDocument } from 'models/UserModel';
import UserController from 'controllers/UserController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<UserDocument>[]>,
) => {
  const controller = new UserController();
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await controller.index());
      default:
        return res.status(405).setHeader('Allow', ['GET']).end();
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
