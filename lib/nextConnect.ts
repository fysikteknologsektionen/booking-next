import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import HTTPResponseError from './HTTPResponseError';

/**
 * Returns a base instance of next-connect.
 * @param allowedMethods Allowed HTTP methods.
 * @returns Instance of next-connect.
 */
export default function nextConnect(allowedMethods: string[]) {
  return nc<NextApiRequest, NextApiResponse>({
    onError: (err, req, res) => {
      switch (err.constructor) {
        case HTTPResponseError:
          res.status(err.statusCode).send(err.message);
          break;
        default:
          res.status(500).send('Internal Server Error');
      }

      // Log server errors and when not in production
      if (
        !(err instanceof HTTPResponseError)
        || process.env.NODE_ENV !== 'production'
      ) {
        console.error(err);
      }
    },
    onNoMatch: (req, res) => {
      res
        .status(405)
        .setHeader('Allow', allowedMethods)
        .send('Method Not Allowed');
    },
  });
}
