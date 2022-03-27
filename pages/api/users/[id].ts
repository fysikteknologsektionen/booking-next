import baseNextConnect from 'src/lib/baseNextConnect';
import parseId from 'src/middlewares/parseId';
import UserService from 'src/services/UserService';

const service = new UserService();

const handler = baseNextConnect(['GET', 'DELETE'])
  .use(parseId)
  .get<{ id: string }>(async (req, res) => {
  res.json(await service.getUser(req.id));
})
  .delete<{ id: string }>(async (req, res) => {
  res.json(await service.deleteUser(req.id));
});

export default handler;
