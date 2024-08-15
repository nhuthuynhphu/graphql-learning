import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'John Doe', age: 25 }];

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(name: string, age: number) {
    const user = {
      id: Math.floor(Math.random() * 10000) + 1,
      name,
      age,
    };
    this.users.push(user);
    return user;
  }
}
