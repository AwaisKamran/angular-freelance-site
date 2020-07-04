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
  public userRating: number; 

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

  activateUser(data){
    return this.http.post(`${this.url}api/user/activateUser.php`, { "data": data });
  }

  login(data) {
    return this.http.post(`${this.url}api/user/login.php`, { "data": data });
  }

  register(data){
    return this.http.post(`${this.url}api/user/addUser.php`, { "data": data });
  }

  flagUser(data){
    return this.http.post(`${this.url}api/user/flagUser.php`, { "data": data });
  }

  updateUserInfo(data){
    return this.http.post(`${this.url}api/user/updateUserInfo.php`, { "data": data });
  }

  updateUserPassword(data){
    return this.http.post(`${this.url}api/user/updatePassword.php`, { "data": data });
  }

  isUserLoggedIn(){
    return localStorage.getItem('user')? true: false;
  }

  checkUserAdmin(id){
    return this.http.get(`${this.url}api/user/checkUserAdmin.php?userId=${id}`);
  }

  hasWorkPermit(){
    return JSON.parse(localStorage.getItem('user')).hasWorkPermit === "1"? true: false;
  }

  hasLicense(){
    return JSON.parse(localStorage.getItem('user')).hasLicense === "1"? true: false;
  }

  isUserAdmin(){
    return this.user && parseInt(this.user.type) === 0? true: false;
  }

  getLoggedInUserImage(){
    return this.user && this.user.id? `${this.url}uploads/user/${this.user.id}.jpg`: undefined;
  }

  submitReview(data){
    return this.http.post(`${this.url}api/user/updateRating.php`, { "data": data });
  }

  getUserById(id){
    return this.http.get(`${this.url}api/user/getUserById.php?userId=${id}`);
  }

  
  getUsers(){
    return this.http.get(`${this.url}api/user/getUsers.php`);
  }

  updateUserLicense(data){
    return this.http.post(`${this.url}api/user/updateUserLicense.php`, { "data": data });
  }

  updateWorkPermit(data){
    return this.http.post(`${this.url}api/user/updateWorkPermit.php`, { "data": data });
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
