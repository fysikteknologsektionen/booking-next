import baseNextConnect from 'src/lib/baseNextConnect';
import UserService from 'src/services/UserService';

const service = new UserService();

const handler = baseNextConnect(['GET']).get(async (req, res) => {
  res.json(await service.listUsers());
});

export default handler;
