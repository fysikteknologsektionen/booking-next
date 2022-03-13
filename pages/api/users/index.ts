import dbConnect from '@lib/dbConnect';
import type { UserDocument } from '@models/UserModel';
import UserModel from '@models/UserModel';
import type { LeanDocument } from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export const indexUsers = async () => {
  await dbConnect();
  const users = await UserModel.find().lean().exec();
  return users;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<LeanDocument<UserDocument>[]>,
) => {
  try {
    switch (req.method) {
      case 'GET':
        return res.json(await indexUsers());
      default:
        return res.status(405).setHeader('Allow', ['GET']).end();
    }
  } catch (error) {
    console.error(error);
    return res.status(500).end();
  }
};

export default handler;
