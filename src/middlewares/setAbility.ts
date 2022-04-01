import type { Ability } from '@casl/ability';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextHandler } from 'next-connect';
import defineAbility from 'src/lib/defineAbility';

export default async function setAbility(
  req: NextApiRequest & { ability: Ability },
  res: NextApiResponse,
  next: NextHandler,
) {
  req.ability = await defineAbility(req);
  next();
}
