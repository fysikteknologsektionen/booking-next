import type { Venue } from 'src/models/VenueModel';
import VenueModel from 'src/models/VenueModel';
import AbstractRepository from './AbstractRepository';

export default class VenueRepository extends AbstractRepository<Venue> {
  constructor() {
    super(VenueModel, ['name', 'description', 'managers', 'enabled']);
  }
}
