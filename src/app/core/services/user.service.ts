import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserNameAndId } from '../types/userTypes';
import { apiEndpoint } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  private usersNamesAndIds = new BehaviorSubject<UserNameAndId[]|null>(null);
  usersNamesAndIds$ = this.usersNamesAndIds.asObservable();

  getUsersNamesAndIds(){
    this.http.get<UserNameAndId[]>(apiEndpoint.UserEndpoint.getUsersNamesAndIds)
    .subscribe((users) => {
      this.usersNamesAndIds.next(users);
    });
  }
}
