import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Route } from '../models/route';
import { Locomotive } from '../models/locomotive';
import { Train } from '../models/train';
import { RailroadCar } from '../models/railroad-car';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TrainService {
  constructor(private http: HttpClient) {}

  private locomotivesUrl = 'http://localhost:8080/locomotives';
  private railroadCarsUrl = 'http://localhost:8080/railroadcars';
  private trainsUrl = 'http://localhost:8080/trains';

  getLocomotives(): Observable<Locomotive[]> {
    return this.http.get<Locomotive[]>(this.locomotivesUrl).pipe(
      catchError(this.handleError('getLocomotives', []))
    );
  }

  addLocomotive(locomotive: Locomotive): Observable<Locomotive> {
    return this.http.post(this.locomotivesUrl, locomotive, httpOptions).pipe(
      tap((locomotive: Locomotive) => console.log('added locomotive')),
      catchError(this.handleError<Locomotive>('addLocomotive'))
    );
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.trainsUrl).pipe(
      catchError(this.handleError('getTrains', []))
    );
  }

  addTrain(train: Train): Observable<Train> {
    return this.http.post(this.trainsUrl, train, httpOptions).pipe(
      tap((train: Train) => console.log('added train')),
      catchError(this.handleError<Train>('addTrain'))
    );
  }

  getRailroadCars(): Observable<RailroadCar[]> {
    return this.http.get<RailroadCar[]>(this.railroadCarsUrl).pipe(
      catchError(this.handleError('getRailroadCars', []))
    );
  }

  addRailroadCar(railroadCar: RailroadCar): Observable<RailroadCar> {
    return this.http.post(this.railroadCarsUrl, railroadCar, httpOptions).pipe(
      tap((railroadCar: RailroadCar) => console.log('added railroadCar')),
      catchError(this.handleError<RailroadCar>('addRailroadCar'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
