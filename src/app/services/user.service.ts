import { Injectable } from '@angular/core';

import { User } from '../models/user';

@Injectable()
export class UserService {
  users: User[] = [];

  addUser(user: User) {
    this.users.push(user);
    console.log(this.users);
  }

  getUsers() {
    return this.users;
  }
}
