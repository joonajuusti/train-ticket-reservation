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
  /**
   * Adds a purchase to server
   * 
   * @param purchase Purchase to be added to the server
   * @returns Observable of the Purchase
   */
  addPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post(this.purchasesUrl, purchase, httpOptions).pipe(
      tap((purchase: Purchase) => console.log('added purchase')),
      catchError(this.handleError<Purchase>('addPurchase'))
    );
  }
  /**
   * Fetches purchases from server and returns them.
   * 
   * @returns Array of Purchases
   */
  getPurchases() {
    return this.http.get<Purchase[]>(this.purchasesUrl).pipe(
      catchError(this.handleError('getPurchases', []))
    );
  }
  /**
   * Deletes a purchase given as a parameter
   * 
   * @param purchase Purchase to be deleted
   */
  deletePurchase(purchase: Purchase): Observable<any> {
    return this.http.put(this.purchasesUrl, purchase, httpOptions).pipe(
      catchError(this.handleError<any>('deletePurchase'))
    );
  }
  /**
   * Sets class variable currentPurchase to the one given as a parameter
   * 
   * @param purchase current purchase to be set
   */
  setCurrentPurchase(purchase: Purchase) {
    this.currentPurchase = purchase;
  }
  /**
   * Returns the current purchase
   * 
   * @returns current Purchase
   */
  getCurrentPurchase() {
    return this.currentPurchase;
  }
  /**
   * Handles errors.
   * 
   * @param operation Operation name set
   * @param result error to be handled
   * @returns error
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
