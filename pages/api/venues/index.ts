import type { Ability } from '@casl/ability';
import { defineAbility } from '@casl/ability';
import baseNextConnect from 'src/lib/baseNextConnect';
import { createVenue, listVenues } from 'src/services/VenueService';

const handler = baseNextConnect(['POST', 'GET'])
  .use(defineAbility)
  .post<{ ability: Ability }>(async (req, res) => {
  res.json(await createVenue(req.ability, req.body));
})
  .get<{ ability: Ability }>(async (req, res) => {
  res.json(await listVenues(req.ability));
});

export default handler;
