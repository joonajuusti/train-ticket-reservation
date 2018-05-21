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
  /**
   * Adds a user to the server
   * 
   * @param user User to be added to server
   * @returns Observable array of type User
   */
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<User>('addUser'))
    );
  }
  /**
   * Fetches users from server
   * 
   * @returns Observable array of type User
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }
  /**
   * Updates the user
   * 
   * @param user The user to be updated
   * @returns Observable array of type User
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Logs in the user given as the parameter
   * 
   * @param user User to be logged in
   */
  setCurrentUser(user: User) {
    //this.currentUser = user;
  }
  /**Logs out the current user */
  logoutCurrentUser() {
    //this.currentUser = null;
  }
  /**
   * Getter for current user
   * 
   * @returns the current user
   */
  getCurrentUser() {
    return this.currentUser;
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
