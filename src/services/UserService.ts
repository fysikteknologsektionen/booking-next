import UserRepository from 'src/repositories/UserRepository';

export default class UserService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
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
