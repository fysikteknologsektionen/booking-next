import baseNextConnect from 'src/lib/baseNextConnect';
import VenueService from 'src/services/VenueService';

const service = new VenueService();

const handler = baseNextConnect(['POST', 'GET'])
  .post(async (req, res) => {
    res.json(await service.createVenue(req.body));
  })
  .get(async (req, res) => {
    res.json(await service.listVenues());
  });

export default handler;
