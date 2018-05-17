import { Component, OnInit} from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private userService: UserService) {}

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
  }
}
