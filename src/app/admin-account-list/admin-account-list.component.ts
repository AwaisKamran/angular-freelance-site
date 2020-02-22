import { Component, OnInit } from '@angular/core';
import { ConstantsService } from "../services/constants.service";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-admin-account-list',
  templateUrl: './admin-account-list.component.html',
  styleUrls: ['./admin-account-list.component.css']
})
export class AdminAccountListComponent implements OnInit {
  public userList: any = [];

  constructor(
    public userService: UserService,
    public constantsService: ConstantsService
  ) { 
    this.getUsers();
  }

  ngOnInit() {
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe((res: any) => {
      if(res.success){
        this.userList = res.data;
      }  
    }, (err: any) => {
    });
  }
}
