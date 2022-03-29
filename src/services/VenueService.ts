import type { Venue } from 'src/models/VenueModel';
import VenueModel from 'src/models/VenueModel';
import BaseRepository from 'src/repositories/BaseRepository';

export default class VenueService {
  private repository: BaseRepository<Venue>;

  constructor() {
    this.repository = new BaseRepository(VenueModel);
  }

  public async createVenue(body: Record<string, any>) {
    return this.repository.create(body);
  }

  public async listVenues() {
    return this.repository.index();
  }

  public async getVenue(id: string) {
    return this.repository.get(id);
  }

  public async updateVenue(id: string, body: Record<string, any>) {
    return this.repository.update(id, body);
  }

  public async deleteVenue(id: string) {
    return this.repository.delete(id);
  }
}
