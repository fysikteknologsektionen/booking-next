import baseNextConnect from 'src/lib/baseNextConnect';
import parseId from 'src/middlewares/parseId';
import VenueService from 'src/services/VenueService';

type ExtendedRequestType = { ability: AppAbility, id: string };


const handler = baseNextConnect(['GET', 'PUT', 'DELETE'])
  .use(parseId)
  .get<ExtendedRequestType>(async (req, res) => {
  res.json(await service.getVenue(req.id));
})
  .put<{ id: string }>(async (req, res) => {
  res.json(await service.updateVenue(req.id, req.body));
})
  .delete<{ id: string }>(async (req, res) => {
  res.json(await service.deleteVenue(req.id));
});

export default handler;
