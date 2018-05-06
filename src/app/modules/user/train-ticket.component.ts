import { Component, OnInit} from '@angular/core';

import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { RouteService } from '../../services/route.service';
import { Route } from '../../models/route';

@Component({
  template:`
  <ul>
    <li *ngFor="let route of routes">
      {{ route.train }}, From: {{ route.departureCity }}, To: {{ route.arrivalCity }}
    </li>
  </ul>`
})
export class TrainTicketComponent implements OnInit {
  constructor(
    private userService: UserService,
    private routeService: RouteService
  ) {}

  currentUser: User;
  routes: Route[];

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes;
      console.log(this.routes);
    });
  }
}
