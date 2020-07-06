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
  public inCorrectEmail: boolean = false;
  public regiterLoading: boolean = false;
  public registerSuccess: boolean = false;
  public registerError: boolean = false;
  public isFreelancer: boolean = true;
  public isRegister: boolean = false;
  public isForgotPasswordView: boolean = false;
  public buttonDisabled: boolean = true;
  public forgotPasswordError: boolean = false;
  public forgotPasswordSuccess: boolean = false;

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
    active: undefined,
    travelRadius: undefined,
    currency: undefined,
    currencySymbol: undefined
  };

  public userData: any = {
    email: undefined,
    password: undefined
  }

  public forgotPasswordData: any = {
    email: undefined
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
        this.data.currency = this.countries[238].currencies[0].name;
        this.data.currencySymbol = this.countries[238].currencies[0].symbol;
        this.flag = this.countries[238].flag;
      }, (error) => {
      }
    );
  }

  countryChanged() {
    this.data.code = this.countries[parseInt(this.data.country)].callingCodes[0];
    this.flag = this.countries[parseInt(this.data.country)].flag;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
      if (this.validateEmail(this.data.email)){
        this.missingFields = false;
        this.inCorrectEmail = false;
        this.data.phone = this.data.code + "" + this.data.phone;
        this.data.country = this.data.country; //this.countries[this.data.country].name;
        this.data.type = this.isFreelancer ? "1" : "0";
        this.data.active = "1";
        this.regiterLoading = true;

        this.userService.register(this.data).subscribe(
          (res: any) => {
            this.regiterLoading = false;
            if (res.success) {
              this.registerError = false;
              this.registerSuccess = true;

              //Login user as the registration is successful
              this.userData.email = this.data.email;
              this.userData.password = this.data.password;
              this.login();
            }
            else {
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
      else{
        this.inCorrectEmail = true;
        this.missingFields = false;
        this.registerError = false;
        this.registerSuccess = false;  
      }
    }
    else {
      this.inCorrectEmail = false;
      this.missingFields = true;
      this.registerError = false;
      this.registerSuccess = false;
    }
  }

  selectType(value) {
    this.isFreelancer = value;
  }

  toggleRegisterForm() {
    this.isRegister = !this.isRegister;
    this.isForgotPasswordView = false;
  }

  backToLogin() {
    this.isRegister = false;
    this.isForgotPasswordView = false;
  }

  toggleForgotPassword() {
    this.isForgotPasswordView = !this.isForgotPasswordView;
  }

  agreeToTerms() {
    this.buttonDisabled = !this.buttonDisabled;
  }

  agreeToAge(){}

  forgotPassword(){
    if(this.forgotPasswordData.email){
      this.loginLoading = true;

      this.userService.forgotPassword(this.forgotPasswordData.email).subscribe(
        (res: any) => {
          this.loginLoading = false;
          if (res.success) {
            this.forgotPasswordSuccess = true;
            this.forgotPasswordError = false;
          }
          else{
            this.forgotPasswordError = true;
            this.forgotPasswordSuccess = false;
          }
        }, (error) => {
          this.loginLoading = false;
          this.forgotPasswordSuccess = false;
          this.forgotPasswordError = true;
        }
      );
    }
  }

  login() {
    if (this.userData.email && this.userData.password) {
      this.loginLoading = true;
      this.userService.login(this.userData).subscribe(
        (res: any) => {
          if (res.success) {
            let container = this;
            if (res.data.type === "2") {
              this.userService.storeUserInfo(res.data).then(function () {
                container.router.navigate([`/admin-account-list`]);
              });
            }
            else {
              this.userService.storeUserInfo(res.data).then(function () {
                container.router.navigate([`/dashboard`]);
              });
            }
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
