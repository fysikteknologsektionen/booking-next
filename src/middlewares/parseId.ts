import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler } from 'next-connect';

/**
 * Parses the id query parameter and sets it on the request object.
 * @param req The request object.
 * @param res The response object.
 * @param next The next handler function.
 */
export default function parseId(
  req: NextApiRequest & { id: string },
  res: NextApiResponse,
  next: NextHandler,
) {
  const { id } = req.query;
  req.id = typeof id === 'string' ? id : id[0];
  next();
}
