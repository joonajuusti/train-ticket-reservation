import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

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
        console.log("username already taken");
        return;
      }
    }
    const user = new User(
      form.value.firstName,
      form.value.lastName,
      form.value.username,
      form.value.password,
      false);
    this.userService.addUser(user)
      .subscribe(user => {
        this.users.push(user);
        this.router.navigateByUrl('/login');
      });
    form.resetForm();
  }
}
