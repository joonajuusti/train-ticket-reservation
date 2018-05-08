import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Train } from '../models/train';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private usersUrl = 'http://localhost:8080/users';

  trains: Train[] = [];
  //currentUser always admin, only for testing purposes
  
  
  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.usersUrl).pipe(
      tap(users => console.log('fetched trains')),
      catchError(this.handleError('getTrains', []))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
