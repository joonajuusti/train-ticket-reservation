import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  register(form: NgForm) {
    const user = new User(
      form.value.firstName,
      form.value.lastName,
      form.value.username,
      form.value.password);
    this.userService.addUser(user);
    form.resetForm();
    this.router.navigateByUrl('/login');
  }
}
