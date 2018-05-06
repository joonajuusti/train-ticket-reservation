import { Component, OnInit} from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: './user-account.component.html'
})
export class UserAccountComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }
}
