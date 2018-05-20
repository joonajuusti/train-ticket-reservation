import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: './user-information.component.html',

})
export class UserInformationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertService: AlertService) {}

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }
  /**
   * Saves user information if they have been changed.
   * 
   * @param form NgForm containing the values of user information page
   */
  saveInformation(form: NgForm) {
    if(!this.haveValuesChanged(form)){
      this.alertService.error('You didn\'t submit any new values!', false);
    }else {
      this.currentUser.creditCard = form.value.creditCard;
      this.currentUser.address = form.value.address;
      this.userService.updateUser(this.currentUser).subscribe(() => {
        form.reset();
        this.alertService.success('Information changed', false);
      });
    }
  }
/**
 * Checks if the user information form values have been changed. 
 * 
 * @param form NgForm containing the values of user information page
 * @returns true if values have been changed, false if not 
 */
  haveValuesChanged(form : NgForm) {
    if(this.currentUser.creditCard === form.value.creditCard
    && this.currentUser.address === form.value.address) {
      return false;
    }else return true;
  }
}
