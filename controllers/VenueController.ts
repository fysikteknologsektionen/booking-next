import type { VenueDocument } from 'models/VenueModel';
import VenueModel from 'models/VenueModel';
import AbstractController from './AbstractController';

export default class VenueController extends AbstractController<VenueDocument> {
  constructor() {
    super(VenueModel, ['name', 'description', 'managers', 'enabled']);
  }
}
