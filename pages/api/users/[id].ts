import type { UserDocument } from 'models/UserModel';
import UserController from 'controllers/UserController';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';
import ApiRouter from 'lib/ApiRouter';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<UserDocument>>,
) => {
  // Get the query id, if it's for some reason an array of ids we select the first.
  const query = req.query;
  const id = typeof query.id === 'string' ? query.id : query.id[0];
  const controller = new UserController();
  const router = new ApiRouter(controller, res, ['GET', 'DELETE']);

  switch (req.method) {
    case 'GET':
      await router.get(id);
      break;
    case 'DELETE':
      await router.delete(id);
      break;
    default:
      router.default();
  }
};

export default handler;
