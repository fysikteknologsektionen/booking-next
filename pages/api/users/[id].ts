import type { Ability } from '@casl/ability';
import baseNextConnect from 'src/lib/baseNextConnect';
import parseId from 'src/middlewares/parseId';
import { deleteUser, getUserById } from 'src/services/UserService';

type ExtendedRequestType = { ability: Ability, id: string };

const handler = baseNextConnect(['GET', 'DELETE'])
  .use(parseId)
  .get<ExtendedRequestType>(async (req, res) => {
  res.json(await getUserById(req.ability, req.id));
})
  .delete<ExtendedRequestType>(async (req, res) => {
  res.json(await deleteUser(req.ability, req.id));
});

export default handler;
