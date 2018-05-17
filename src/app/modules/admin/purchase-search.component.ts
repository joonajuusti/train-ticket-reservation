import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Purchase } from '../../models/purchase';
import { Route } from '../../models/route';

import { PurchaseService } from '../../services/purchase.service';
import { RouteService } from '../../services/route.service';

@Component({
  templateUrl: './purchase-search.component.html'
})
export class PurchaseSearchComponent implements OnInit {
  constructor(
    private purchaseService: PurchaseService,
    private routeService: RouteService,
    private router: Router
  ) {}

  purchases: Purchase[];
  routes: Route[];
  usernames: string[];
  currentPurchase: Purchase;
  searchResultPurchases: Purchase[] = [];

  ngOnInit() {
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes;
    });
    this.purchaseService.getPurchases().subscribe(purchases => {
      this.purchases = purchases;
      this.usernames = this.findUsersWhoHavePurchases(this.purchases);
    });
  }

  findPurchases(form: NgForm) {
    if(form.value.username !== null) {
      this.filterByUsers(form.value.username);
    }else if(form.value.route !== null) {
      this.filterByRoutes(form.value.route);
    }else if(form.value.date !== null) {
      this.filterByDate(form.value.date);
    }
  }

  filterByUsers(username: string) {
    this.searchResultPurchases = this.purchases.filter(purchase => purchase.user.username === username);
  }

  filterByRoutes(route: Route) {
    this.searchResultPurchases = this.purchases.filter(purchase => {
      return purchase.route.id === route.id
    });
  }

  filterByDate(date: Date) {
    this.searchResultPurchases = [];
    let formDate = new Date(date).toDateString();
    for(let purchase of this.purchases) {
      if(new Date(purchase.route.departureTime).toDateString() === formDate) {
        this.searchResultPurchases.push(purchase);
      }
    }
  }

  findUsersWhoHavePurchases(purchases: Purchase[]) {
    return Array.from(new Set(purchases.map(purchase => purchase.user.username)));
  }

  clear(form: NgForm) {
    this.searchResultPurchases = [];
    form.reset();
  }
}
