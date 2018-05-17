import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Purchase } from '../../models/purchase';

import { PurchaseService } from '../../services/purchase.service';

const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

@Component({
  selector: 'purchase-card',
  templateUrl: './purchase-card.component.html'
})
export class PurchaseCardComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseService,
    private router: Router) {}

  @Input() purchase: Purchase;

  dateString: string;

  ngOnInit(){
    this.dateString = new Date(this.purchase.route.departureTime).toLocaleDateString('en-GB', dateOptions);
  }

  managePurchase() {
    this.purchaseService.setCurrentPurchase(this.purchase);
    this.router.navigateByUrl('user/admin/purchase-manage');
  }
}
