import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';
import { CountryService } from './country.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public user: any;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService,
    public countryService: CountryService
  ) {
    this.url = this.constantsService.url;
    if (localStorage.getItem('user')) this.user = JSON.parse(localStorage.getItem('user'));
  }

  getUserObject(){
    return this.user;
  }

  login(data) {
    return this.http.post(`${this.url}api/user/login.php`, { "data": data });
  }

  register(data){
    return this.http.post(`${this.url}api/user/addUser.php`, { "data": data });
  }

  updateUserInfo(data){
    return this.http.post(`${this.url}api/user/updateUserInfo.php`, { "data": data });
  }

  isUserLoggedIn(){
    return localStorage.getItem('user')? true: false;
  }

  isUserAdmin(){
    return parseInt(this.user.type) === 0? true: false;
  }

  getLoggedInUserImage(){
    return `${this.url}uploads/user/${this.user.id}.jpg`;
  }

  storeUserInfo(data){
    let container = this;
    return new Promise(function(resolve, reject){   
      localStorage.setItem('user', JSON.stringify(data));
      container.user = JSON.parse(localStorage.getItem('user'));

      container.user.flag = container.countryService.data[container.user.country].flag;
      container.user.countryName = container.countryService.data[container.user.country].nativeName;

      localStorage.setItem('user', JSON.stringify(container.user));
      resolve();
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.user = undefined;
  }
}
