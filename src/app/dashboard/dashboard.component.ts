import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from "../services/user.service";
import { ConstantsService } from '../services/constants.service';
import { OrderService } from '../services/order.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public url: any;
  public userView: boolean = false;
  public orderList: any = [];

  constructor(
    public userService: UserService,
    public orderService: OrderService,
    public constantsService: ConstantsService,
    public ratingService: RatingService
  ) { 
    this.url = this.constantsService.url;
  }

  ngOnInit() {
    this.userView = this.isUserView();
    if(this.userView) this.getUserOrderList(this.userService.getUserObject().id);  
  }

  isUserView(){
    return !this.userService.isUserAdmin(); 
  }

  getUserOrderList(id){
    this.orderService.getOrderByUserId(id)
    .subscribe((res: any) => {
      if(res.success){
        this.orderList = res.data;
      }  
    }, (err: any) => {
    });
  }
}
