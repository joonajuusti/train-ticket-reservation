import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Purchase } from '../../models/purchase';

import { PurchaseService } from '../../services/purchase.service';
import { AlertService } from '../../services/alert.service';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

@Component({
  selector: 'user-purchase-card',
  templateUrl: './user-purchase-card.component.html'
})
export class UserPurchaseCardComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseService,
    private alertService: AlertService,
    private router: Router
  ) {}

  @Input() purchase: Purchase;

  dateString: string;
  seatsString: string;

  ngOnInit(){
    this.dateString = new Date(this.purchase.route.departureTime).toLocaleDateString('en-GB', dateOptions);
    this.seatsString = this.purchase.seats.map(seat => seat + 1).join(', ');
  }

  deletePurchase() {
    this.purchaseService.deletePurchase(this.purchase).subscribe(() => {
      this.alertService.success('Purchase deleted', true);
      this.router.navigateByUrl('user/account');
    });
  }
}
