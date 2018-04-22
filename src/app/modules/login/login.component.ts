import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  users: User[];

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  login(form: NgForm) {
    for(let user of this.users) {
      if(user.username === form.value.username) {
        user.password === form.value.password ? this.setCurrentUser(user) : console.log("invalid password");
      }
    }
  }

  setCurrentUser(user: User) {
    this.userService.setCurrentUser(user);
    this.router.navigateByUrl('/user');
    console.log("Login successful. User currently logged in: " + this.userService.getCurrentUser().username);
  }
}
