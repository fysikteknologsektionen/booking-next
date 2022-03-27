import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import handleApiError from './handleApiError';

/**
 * Returns a base instance of next-connect.
 * @param allowedMethods Allowed HTTP methods.
 * @returns Instance of next-connect.
 */
export default function baseNextConnect(allowedMethods: string[]) {
  return nextConnect<NextApiRequest, NextApiResponse>({
    onError: handleApiError,
    onNoMatch: (req, res) => {
      res
        .status(405)
        .setHeader('Allow', allowedMethods)
        .send('Method Not Allowed');
    },
  });
}
