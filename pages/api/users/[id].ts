import nextConnect from 'lib/nextConnect';
import { deleteUser, updateUserRole } from 'services/user';

const handler = nextConnect(['GET'])
  .delete<{ id: number }>(async (req, res) => {
  res.json(await deleteUser(req.id));
})
  .patch<{ id: number }>(async (req, res) => {
  res.json(await updateUserRole(req.id, req.body.role));
});

export default handler;
