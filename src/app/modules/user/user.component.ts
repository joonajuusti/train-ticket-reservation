import { Component, OnInit} from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logoutCurrentUser();
  }
}
