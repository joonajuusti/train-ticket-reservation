import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private userService: UserService) {}

  users: User[];

  login(form: NgForm) {
    this.users = this.userService.getUsers();
    console.log(this.users);
    for(let user of this.users) {
      if(user.username === form.value.username) {
        user.password === form.value.password ? console.log("login succesful") : console.log("invalid password");
        break;
      }else console.log("user does not exist");
    }
  }
}
