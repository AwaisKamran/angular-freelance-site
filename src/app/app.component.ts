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
  public isUserAdmin: boolean = false;
  public showFood = false;
  public showCleaning = false;
  public showMaintenance = false;
  public showManagement = false;
  public showPets = false;
  public showChildren = false;
  public showElderly = false;
  public showLifestyle = false;

  constructor(
    public userService: UserService,
    public router: Router
  ) { }

  onActivate(evt) {
    this.isUserActive = this.userService.isUserLoggedIn();
    this.isUserAdmin = this.userService.isUserAdmin();

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

  toggleFood() {
    let val = this.showFood;
    this.resetDropdowns();
    this.showFood = !val;
  }

  toggleCleaning() {
    let val = this.showCleaning;
    this.resetDropdowns();
    this.showCleaning = !val;
  }

  toggleMaintenance() {
    let val = this.showMaintenance;
    this.resetDropdowns();
    this.showMaintenance = !val;
  }

  toggleManagement() {
    let val = this.showManagement;
    this.resetDropdowns();
    this.showManagement = !val;
  }

  togglePets() {
    let val = this.showPets;
    this.resetDropdowns();
    this.showPets = !val;
  }

  toggleChildren() {
    let val = this.showChildren;
    this.resetDropdowns();
    this.showChildren = !val;
  }

  toggleElderly() {
    let val = this.showElderly;
    this.resetDropdowns();
    this.showElderly = !val;
  }

  toggleLifestyle() {
    let val = this.showLifestyle;
    this.resetDropdowns();
    this.showLifestyle = !val;
  }

  resetDropdowns() {
    this.showFood = false;
    this.showCleaning = false;
    this.showMaintenance = false;
    this.showManagement = false;
    this.showPets = false;
    this.showChildren = false;
    this.showElderly = false;
    this.showLifestyle = false;
  }
}
