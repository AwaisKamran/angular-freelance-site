import { Component } from '@angular/core';
import { UserService } from "./services/user.service";
import { DropdownService } from "./services/dropdown.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public isUserActive: boolean = false;
  public isUserAdmin: boolean = false;
  public userImagePath = undefined;

  constructor(
    public userService: UserService,
    public dropDownService: DropdownService,
    public router: Router
  ) { }

  onActivate(evt) {
    this.isUserActive = this.userService.isUserLoggedIn();
    this.isUserAdmin = this.userService.isUserAdmin();
    this.userImagePath = `url(${this.userService.getLoggedInUserImage()}), url(./assets/images/profile-pic.png)`;

    if (!this.isUserActive && (evt.constructor.name !== 'RegisterComponent')) {
      this.router.navigate([`/login`]);
    }

    else if (this.isUserActive && (evt.constructor.name === 'LoginComponent')) {
      this.router.navigate([`/dashboard`]);
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate([`/login`]);
  }

  navigateToUserServices() {
    this.router.navigate([`/user-services`]);
  }

  navigateToSettings() {
    this.router.navigate([`/user-settings`]);
  }

  register() {
    this.router.navigate([`/register`]);
  }
}
