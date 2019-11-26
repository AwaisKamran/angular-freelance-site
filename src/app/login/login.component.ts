import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public dummyUsers = [];
  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }
}
