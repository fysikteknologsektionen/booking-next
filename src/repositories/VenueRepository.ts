import type { Venue } from 'src/models/VenueModel';
import VenueModel from 'src/models/VenueModel';
import BaseRepository from './BaseRepository';

export default class VenueRepository extends BaseRepository<Venue> {
  constructor() {
    super(VenueModel, ['name', 'description', 'managers', 'enabled']);
  }
}
