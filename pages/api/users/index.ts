import type { UserDocument } from 'models/UserModel';
import UserController from 'controllers/UserController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ApiRouter from 'lib/ApiRouter';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<UserDocument>[]>,
) => {
  const controller = new UserController();
  const router = new ApiRouter(controller, res, ['GET']);

  switch (req.method) {
    case 'GET':
      await router.index();
      break;
    default:
      router.default();
  }
};

export default handler;
