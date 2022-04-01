import type { Ability } from '@casl/ability';
import baseNextConnect from 'src/lib/baseNextConnect';
import { listUsers } from 'src/services/UserService';

const handler = baseNextConnect(['GET'])
  .get<{ ability: Ability }>(async (req, res) => {
  res.json(await listUsers(req.ability));
});

export default handler;
