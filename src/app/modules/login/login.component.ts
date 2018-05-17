import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) {}

  users: User[];

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  login(form: NgForm) {
    for(let user of this.users) {
      if(user.username === form.value.username) {
        if(user.password === form.value.password) {
          this.setCurrentUser(user);
          return;
        }else this.alertService.error('Invalid password', false)
      }else if(this.users.indexOf(user) === this.users.length - 1) this.alertService.error('Username not found', false);
    }
  }

  setCurrentUser(user: User) {
    this.userService.setCurrentUser(user);
    this.router.navigateByUrl('/user');
  }
}
