import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RouteService } from '../../services/route.service';
import { UserService } from '../../services/user.service';
import { PurchaseService } from '../../services/purchase.service';
import { AlertService } from '../../services/alert.service';

import { Route } from '../../models/route';
import { Purchase } from '../../models/purchase';
import { User } from '../../models/user';

@Component({
  templateUrl: './ticket-purchase.component.html'
})
export class TicketPurchaseComponent implements OnInit {
  constructor(
    private routeService: RouteService,
    private userService: UserService,
    private purchaseService: PurchaseService,
    private router: Router,
    private alertService: AlertService
    ) {}

  currentRoute: Route;
  currentUser: User;
  purchasedSeats: number[];
  purchasedSeatsString: string;
  railroadCarNumber: number;
  paid: boolean = true;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.currentRoute = this.routeService.getCurrentRoute();
    this.railroadCarNumber = this.routeService.getRailroadCarNumber();
    this.purchasedSeats = this.routeService.getPurchasedSeats();
    this.purchasedSeatsString = this.purchasedSeats.reduce((acc, currentSeat) => {
      return acc + (currentSeat + 1).toString() + ', ';
    }, '');
    this.purchasedSeatsString = this.purchasedSeatsString.substring(0, this.purchasedSeatsString.length - 2);
  }

  purchaseTickets(paid: boolean) {
    const purchase = new Purchase(
      this.currentRoute,
      this.currentUser,
      this.railroadCarNumber,
      this.purchasedSeats,
      paid
    );
    this.purchaseService.addPurchase(purchase).subscribe(purchase => {
      this.alertService.success('Purchase confirmed', true);
      this.router.navigateByUrl('user/tickets');
    });
    this.routeService.resetPurchasedSeats();
  }

  cancelPurchase() {
    this.currentRoute.availableSeats = this.currentRoute.availableSeats + this.purchasedSeats.length;
    for(let seatNumber of this.purchasedSeats) {
      let seatIndex = this.currentRoute.seatsTaken[this.railroadCarNumber].indexOf(seatNumber);
      this.currentRoute.seatsTaken[this.railroadCarNumber].splice(seatIndex, 1);
    }
    this.routeService.reserveSeats(this.currentRoute).subscribe(() => {
      this.router.navigateByUrl('user/tickets');
    });
    this.alertService.error('Canceled purchase', true);
  }
}
