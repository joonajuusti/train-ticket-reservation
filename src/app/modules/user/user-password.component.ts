import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AlertService } from '../../services/alert.service';

@Component({
  templateUrl: './user-password.component.html'
})
export class UserPasswordComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) {}

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  changePassword(form: NgForm){
    if(this.currentUser.password === form.value.oldPassword && form.value.newPassword === form.value.newPasswordConfirm){
      this.currentUser.password = form.value.newPassword;
      this.userService.updateUser(this.currentUser).subscribe(() => {
        form.reset();
        this.alertService.success('Password changed', false);
      });
    }else if(!(this.currentUser.password === form.value.oldPassword)) {
      form.reset();
      this.alertService.error('Incorrect password', false);
    }else if(!(form.value.newPassword === form.value.newPasswordConfirm)) {
      form.reset();
      this.alertService.error('Incorrect confirmation', false);
    }
  }
}
