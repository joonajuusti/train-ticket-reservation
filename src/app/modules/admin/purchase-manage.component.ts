import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Purchase } from '../../models/purchase';
import { Route } from '../../models/route';

import { PurchaseService } from '../../services/purchase.service';
import { RouteService } from '../../services/route.service';

@Component({
  templateUrl: './purchase-manage.component.html'
})
export class PurchaseManageComponent implements OnInit {
  constructor(private purchaseService: PurchaseService) {}

  currentPurchase: Purchase;

  ngOnInit() {
    this.currentPurchase = this.purchaseService.getCurrentPurchase();
  }
}
