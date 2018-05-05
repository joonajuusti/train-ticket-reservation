import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Route } from '../models/route';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RouteService {
  constructor(private http: HttpClient) {}

  private routesUrl = 'http://localhost:8080/routes';

  routes: Route[];

  addRoute(route: Route): Observable<Route> {
    return this.http.post(this.routesUrl, route, httpOptions).pipe(
      tap((route: Route) => console.log('added route')),
      catchError(this.handleError<Route>('addRoute'))
    );
  }

  getRoutes() {
    return this.http.get<Route[]>(this.routesUrl).pipe(
      tap(users => console.log('fetched routes')),
      catchError(this.handleError('getRoutes', []))
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
