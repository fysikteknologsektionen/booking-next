import nextConnect from 'lib/nextConnect';
import parseId from 'middlewares/parseId';

const handler = nextConnect(['GET', 'PUT', 'DELETE'])
  .use(parseId)
  .get<{ id: string }>(async (req, res) => {
  res.json(await getVenue(req.id));
})
  .put<{ id: string }>(async (req, res) => {
  res.json(await service.updateVenue(req.id, req.body));
})
  .delete<{ id: string }>(async (req, res) => {
  res.json(await service.deleteVenue(req.id));
});

export default handler;
