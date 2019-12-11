import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {
  public showFood = false;
  public showCleaning = false;
  public showMaintenance = false;
  public showManagement = false;
  public showPets = false;
  public showChildren = false;
  public showElderly = false;
  public showLifestyle = false;

  constructor() { }

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