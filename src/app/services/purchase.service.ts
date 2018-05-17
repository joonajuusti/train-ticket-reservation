import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Purchase } from '../models/purchase';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PurchaseService {
  constructor(private http: HttpClient) {}

  private purchasesUrl = 'http://localhost:8080/purchases';

  currentPurchase: Purchase;

  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post(this.purchasesUrl, purchase, httpOptions).pipe(
      tap((purchase: Purchase) => console.log('added purchase')),
      catchError(this.handleError<Purchase>('addPurchase'))
    );
  }

  getPurchases() {
    return this.http.get<Purchase[]>(this.purchasesUrl).pipe(
      catchError(this.handleError('getPurchases', []))
    );
  }

  deletePurchase(purchase: Purchase): Observable<any> {
    return this.http.put(this.purchasesUrl, purchase, httpOptions).pipe(
      catchError(this.handleError<any>('deletePurchase'))
    );
  }

  setCurrentPurchase(purchase: Purchase) {
    this.currentPurchase = purchase;
  }

  getCurrentPurchase() {
    return this.currentPurchase;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
