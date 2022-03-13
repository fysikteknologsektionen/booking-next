import dbConnect from '@lib/dbConnect';
import HTTPResponseError from '@lib/HTTPResponseError';
import type { UserDocument } from '@models/UserModel';
import UserModel from '@models/UserModel';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const getUser = async (id: string) => {
  await dbConnect();
  const user = await UserModel.findById(id).lean().exec();
  if (!user) {
    throw new HTTPResponseError(404, `User with id '${id}' not found.`);
  }
  return user;
};

export const deleteUser = async (id: string) => {
  await dbConnect();
  const user = await UserModel.findByIdAndDelete(id).lean().exec();
  if (!user) {
    throw new HTTPResponseError(404, `User with id '${id}' not found.`);
  }
  return user;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<UserDocument>>,
) => {
  // Get the query id, if it's for some reason an array of ids we select the first.
  const query = req.query;
  const id = typeof query.id === 'string' ? query.id : query.id[0];
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await getUser(id));
      case 'DELETE':
        return res.json(await deleteUser(id));
      default:
        return res.status(405).setHeader('Allow', ['GET', 'DELETE']).end();
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
