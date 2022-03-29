import type { User } from 'src/models/UserModel';
import UserModel from 'src/models/UserModel';
import BaseRepository from 'src/repositories/BaseRepository';

export default class UserService {
  private repository: BaseRepository<User>;

  constructor() {
    this.repository = new BaseRepository(UserModel);
  }

  public async listUsers() {
    return this.repository.index();
  }

  public async getUser(id: string) {
    return this.repository.get(id);
  }

  public async deleteUser(id: string) {
    return this.repository.delete(id);
  }
}
