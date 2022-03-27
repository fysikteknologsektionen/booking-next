import type { NextApiRequest, NextApiResponse } from 'next';
import HTTPResponseError from './HTTPResponseError';

/**
 * Handles errors thrown during API call.
 * @param err The error object.
 * @param req The request object.
 * @param res The response object.
 */
export default function handleApiError<T extends Error>(
  err: T,
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  if (err instanceof HTTPResponseError) {
    res.status(err.statusCode).send(err.message);
  } else {
    res.status(500).send('Internal Server Error');
  }
  // Log server errors and when not in production
  if (
    !(err instanceof HTTPResponseError)
    || process.env.NODE_ENV !== 'production'
  ) {
    console.error(err);
  }
}
