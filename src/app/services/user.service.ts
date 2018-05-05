import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private usersUrl = 'http://localhost:8080/users';

  users: User[] = [];
  //currentUser always admin, only for testing purposes
  currentUser: User =
    {
      firstName: 'admin',
      lastName: 'admin',
      username: 'admin',
      password: 'admin',
      admin: true,
      creditCard: '1234',
      address: 'Admin Street 1'
    };

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((user: User) => console.log('added hero')),
      catchError(this.handleError<User>('addUser'))
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      tap(users => console.log('fetched users')),
      catchError(this.handleError('getUsers', []))
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      tap(_ => console.log(`updated user ${user.username}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  //uncomment following functions after done testing
  setCurrentUser(user: User) {
    //this.currentUser = user;
  }

  logoutCurrentUser() {
    //this.currentUser = null;
  }

  getCurrentUser() {
    return this.currentUser;
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
