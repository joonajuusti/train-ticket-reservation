import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService) {}

  users: User[];

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  register(form: NgForm): void {
    for(let user of this.users) {
      if(user.username === form.value.username) {
        this.alertService.error('Username already taken', false);
        return;
      }
    }
    const user = new User(
      form.value.firstName, form.value.lastName, form.value.username,
      form.value.password, false, null, null
    );
    this.userService.addUser(user)
      .subscribe(user => {
        this.alertService.success('Registration successful', true);
        this.router.navigateByUrl('/login');
      });
    form.resetForm();
  }
}
