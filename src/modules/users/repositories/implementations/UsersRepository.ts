import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    const user = await this.repository.findOne({
      relations: ['games'],
      where: {
        id: user_id
      }
    })

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query(
      "SELECT * FROM users ORDER BY first_name"
    ); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    return this.repository.query(
      "SELECT * FROM users WHERE lower(first_name) = $1 and lower(last_name) = $2",
      [first_name.toLocaleLowerCase(), last_name.toLocaleLowerCase()]
    ); // Complete usando raw query
  }
}
