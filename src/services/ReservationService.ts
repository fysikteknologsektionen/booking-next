import HTTPResponseError from 'src/lib/HTTPResponseError';
import type { Reservation, ReservationStatus } from 'src/models/ReservationModel';
import ReservationModel from 'src/models/ReservationModel';
import BaseRepository from 'src/repositories/BaseRepository';

export default class ReservationService extends AbstractService {
  private repository: BaseRepository<Reservation>;

  constructor() {
    this.repository = new BaseRepository(ReservationModel);
  }

  public async createReservation(body: Record<string, any>) {
    if (!body.client && !body.anonymousClient) {
      throw new HTTPResponseError(
        422,
        'Reservation requires one of the "client" or "anonymousClient" fields.',
      );
    }

    if (body.client) {
      // TODO: Check auth
    }

    return this.repository.create(body);
  }

  public async listReservations() {
    return this.repository.index();
  }

  public async getReservation(id: string) {
    return this.repository.get(id);
  }

  public async updateReservation(id: string, body: Record<string, any>) {
    return this.repository.update(id, body);
  }

  public async updateReservationStatus(id: string, status: ReservationStatus) {
    return this.repository.update(id, { status });
    // TODO: mail client
  }

  public async deleteReservation(id: string) {
    return this.repository.delete(id);
  }
}
