import { Component, OnInit } from '@angular/core';
import { ConstantsService } from "../services/constants.service";
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-account-list',
  templateUrl: './admin-account-list.component.html',
  styleUrls: ['./admin-account-list.component.css']
})
export class AdminAccountListComponent implements OnInit {
  public userList: any = [];
  public viewList: any = [];
  public active = true;
  public activeUsers = 0;
  public inActiveUsers = 0;
  public flaggedUsers = 0;
  public freelancerCount = 0;
  public hirerCount = 0;

  constructor(
    private router: Router,
    public userService: UserService,
    public constantsService: ConstantsService
  ) {
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((res: any) => {
        if (res.success) {
          this.userList = res.data;
          this.calculateStats();
          this.showUserList();
        }
      }, (err: any) => {
      });
  }

  calculateStats() {
    this.activeUsers = 0;
    this.inActiveUsers = 0;
    this.flaggedUsers = 0;
    this.freelancerCount = 0;
    this.hirerCount = 0;

    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].type !== "2") {
        if(this.userList[i].type === "1") this.freelancerCount++;
        if(this.userList[i].type === "0") this.hirerCount++;

        if(this.userList[i].flagged === "1"){
          if (this.userList[i].active === "1") this.flaggedUsers++;
          else if (this.userList[i].active === "0") this.inActiveUsers++;
        }
        else if(this.userList[i].flagged === "0"){
          if (this.userList[i].active === "1") this.activeUsers++;
          else if (this.userList[i].active === "0") this.inActiveUsers++;
        }
      }
    }
  }

  toggleUserActivation({ id, active }) {
    if (confirm("Are you sure you want to update this user?")) {
      this.userService.activateUser({ "id": id, "value": active === "1" ? "0" : "1" })
        .subscribe((res: any) => {
          if (res.success) {
            this.showToast(true);
            this.getUsers();
          }
          else {
            this.showToast(false);
          }
        }, (err: any) => {
        });
    }
  }

  findUserName(event) {
    if (event.target.value) {
      this.viewList = this.userList.filter((user) => user.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
    }
    else {
      this.viewList = this.userList;
    }
  }

  showUserList(active = true, flagged = false) {
    this.active = active || flagged;
    if(!flagged){
      this.viewList = this.userList.filter((user) => {
        if((active === true && user.active === "1" && user.flagged === "0")){
          return true;
        }
        else if((active === false && user.active === "0")){
          return true;
        }
      });
    }
    else{
      this.viewList = this.userList.filter((user) => {
        if((flagged === true && user.flagged === "1" && user.active === "1")){
          return true;
        }
      });
    }
  }

  showUserTypeList(type = 1) {
    this.viewList = this.userList.filter((user) => {
      if(user.type === type){
        return true;
      }
    });
  }

  showToast(success) {
    var x = document.getElementById("snackbar");
    x.style.backgroundColor = success ? "#1db36d" : "#dc3545";
    x.innerHTML = success ?
      '<i class="fa fa-check-circle" aria-hidden="true"></i> The user status has been updated' :
      '<i class="fa fa-times-circle" aria-hidden="true"></i> There was an internal server error';

    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
  }

  navigateToProfile(id) {
    this.router.navigate([`/user-profile/${id}`]);
  }
}
