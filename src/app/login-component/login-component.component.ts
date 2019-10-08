import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  public loginSuccess: boolean = false;
  public loginError: boolean = false;
  public loginLoading: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  login(){
    this.loginLoading = true;
  }

}
