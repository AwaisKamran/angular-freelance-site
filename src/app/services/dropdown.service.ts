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
    if(this.showFood) localStorage.setItem("searchItemParent", 'Food');
  }

  toggleCleaning() {
    let val = this.showCleaning;  
    this.resetDropdowns();
    this.showCleaning = !val;
    if(this.showCleaning) localStorage.setItem("searchItemParent", 'Cleaning');
  }

  toggleMaintenance() {
    let val = this.showMaintenance;
    if(val) localStorage.setItem("searchItemParent", 'Maintenance');
    this.resetDropdowns();
    this.showMaintenance = !val;
    if(this.showMaintenance) localStorage.setItem("searchItemParent", 'Maintenance');
  }

  toggleManagement() {
    let val = this.showManagement;
    if(val) localStorage.setItem("searchItemParent", 'Management');
    this.resetDropdowns();
    this.showManagement = !val;
    if(this.showManagement) localStorage.setItem("searchItemParent", 'Management');
  }

  togglePets() {
    let val = this.showPets;
    if(val) localStorage.setItem("searchItemParent", 'Pets');
    this.resetDropdowns();
    this.showPets = !val;
    if(this.showPets) localStorage.setItem("searchItemParent", 'Pets');
  }

  toggleChildren() {
    let val = this.showChildren;
    if(val) localStorage.setItem("searchItemParent", 'Children');
    this.resetDropdowns();
    this.showChildren = !val;
    if(this.showChildren) localStorage.setItem("searchItemParent", 'Children');
  }

  toggleElderly() {
    let val = this.showElderly;
    if(val) localStorage.setItem("searchItemParent", 'Elderly');
    this.resetDropdowns();
    this.showElderly = !val;
    if(this.showElderly) localStorage.setItem("searchItemParent", 'Elderly');
  }

  toggleLifestyle() {
    let val = this.showLifestyle;
    if(val) localStorage.setItem("searchItemParent", 'Lifestyle');
    this.resetDropdowns();
    this.showLifestyle = !val;
    if(this.showLifestyle) localStorage.setItem("searchItemParent", 'Lifestyle');
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
