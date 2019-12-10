import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public missingFields: boolean = false;
  public regiterLoading: boolean = false;
  public registerSuccess: boolean = false;
  public registerError: boolean = false;
  public isFreelancer: boolean = true;
  public isRegister: boolean = false;

  public loginSuccess: boolean = false;
  public loginError: boolean = false;
  public loginLoading: boolean = false;

  public countries: any = [];
  public flag: any;
  public data: any = {
    name: undefined,
    email: undefined,
    password: undefined,
    position: undefined,
    code: undefined,
    country: undefined,
    city: undefined,
    phone: undefined,
    type: undefined,
    travelRadius: undefined
  };

  public userData: any = {
    email: undefined,
    password: undefined
  }

  constructor(
    public countryService: CountryService,
    public userService: UserService,
    public router: Router
  ) {
    this.getCountries();
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      (res: any) => {
        this.countryService.data = res;
        this.countries = res;
        this.data.country = 238;
        this.data.code = this.countries[238].callingCodes[0];
        this.flag = this.countries[238].flag;
      }, (error) => {
      }
    );
  }

  countryChanged() {
    this.data.code = this.countries[parseInt(this.data.country)].callingCodes[0];
    this.flag = this.countries[parseInt(this.data.country)].flag;
  }

  register() {
    if (
      this.data.name &&
      this.data.email &&
      this.data.password &&
      this.data.code &&
      this.data.phone &&
      this.data.country &&
      this.data.city
    ) {
      this.missingFields = false;
      this.data.phone = this.data.code + "" + this.data.phone;
      this.data.country = this.data.country; //this.countries[this.data.country].name;
      this.data.type = this.isFreelancer? "1": "0";
      this.regiterLoading = true;

      this.userService.register(this.data).subscribe(
        (res: any) => {
          this.regiterLoading = false;
          if(res.success){
            this.registerError = false;
            this.registerSuccess = true;

            //Login user as the registration is successful
            this.userData.email = this.data.email;
            this.userData.password = this.data.password;
            this.login();
          }
          else{
            this.registerError = true;
            this.registerSuccess = false;
          }
        }, (error) => {
          this.regiterLoading = false;
          this.registerError = true;
          this.registerSuccess = false;
        }
      );
    }
    else {
      this.missingFields = true;
      this.registerError = false;
      this.registerSuccess = false;
    }
  }

  selectType(value){
    this.isFreelancer = value;
  }

  toggleRegisterForm(){
    this.isRegister = !this.isRegister;
  }

  login() {
    if (this.userData.email && this.userData.password) {
      this.loginLoading = true;
      this.userService.login(this.userData).subscribe(
        (res: any) => {
          if (res.success) {
            let container = this;
            this.userService.storeUserInfo(res.data).then(function(){
              container.router.navigate([`/dashboard`]);
            });
          }
          else {
            this.loginError = true;
          }
          this.loginLoading = false;
        }, (error) => {
          this.loginLoading = false;
          this.loginError = true;
        }
      )
    }
  }
}
