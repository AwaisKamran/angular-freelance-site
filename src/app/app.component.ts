import { Component } from '@angular/core';
import { UserService } from "./services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isUserActive: boolean = false;

  constructor(
    public userService: UserService,
    public router: Router
  ){}

  onActivate(evt){
    this.isUserActive = this.userService.isUserLoggedIn();
    if(!this.isUserActive && (evt.constructor.name !== 'RegisterComponent')){
      this.router.navigate([`/login`]);
    }

    else if(this.isUserActive && (evt.constructor.name === 'LoginComponent')){
      this.router.navigate([`/dashboard`]);
    }
  }

  logout(){
    this.userService.logout();
    this.router.navigate([`/login`]);
  }

  navigateToUserServices(){
    this.router.navigate([`/user-services`]);
  }

  navigateToSettings(){
    this.router.navigate([`/user-settings`]);
  }

  register() {
    this.router.navigate([`/register`]);
  }
}
