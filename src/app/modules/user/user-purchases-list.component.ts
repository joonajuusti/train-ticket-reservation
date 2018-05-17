import { Component, OnInit } from '@angular/core';

import { Purchase } from '../../models/purchase';
import { User } from '../../models/user';

import { PurchaseService } from '../../services/purchase.service';
import { UserService } from '../../services/user.service';

@Component({
  template: `
  <div *ngIf="purchases.length === 0">
    <h6>You don't have any purchases.</h6>
  </div>
  <div class="card-group">
    <user-purchase-card *ngFor="let purchase of purchases" [purchase]="purchase" class="col-md-3"></user-purchase-card>
  </div>
  `
})
export class UserPurchasesListComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseService,
    private userService: UserService
  ) {}

  purchases: Purchase[] = [];
  currentUser: User;

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
      this.purchases = this.purchases.filter(purchase => purchase.user.username === this.currentUser.username);
    });
  }
}
