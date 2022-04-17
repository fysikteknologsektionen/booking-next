import nextConnect from 'lib/nextConnect';
import { createVenue } from 'services/venue';

const handler = nextConnect(['POST'])
  .post(async (req, res) => {
    res.json(await createVenue(req.body));
  });

export default handler;
