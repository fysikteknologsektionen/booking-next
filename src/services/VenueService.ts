import VenueRepository from 'src/repositories/VenueRepository';

export default class VenueService {
  private repository: VenueRepository;

  constructor() {
    this.repository = new VenueRepository();
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
