import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public user: any;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) {
    this.url = this.constantsService.url;
    if (localStorage.getItem('user')) this.user = JSON.parse(localStorage.getItem('user'));
  }

  login(data) {
    return this.http.post(`${this.url}api/user/login.php`, { "data": data });
  }

  register(data){
    return this.http.post(`${this.url}api/user/addUser.php`, { "data": data });
  }

  isUserLoggedIn(){
    return localStorage.getItem('user')? true: false;
  }

  isUserAdmin(){
    return parseInt(this.user.type) === 0? true: false;
  }

  storeUserInfo(data){
    let container = this;
    return new Promise(function(resolve, reject){
      localStorage.setItem('user', JSON.stringify(data));
      container.user = JSON.parse(localStorage.getItem('user'));
      resolve();
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.user = undefined;
  }
}