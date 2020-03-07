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
  public filteredOrders: any = [];
  public activeTab: number = 0;
  public tabs: any[] = [
    {
      id: 0,
      name: 'Scheduled',
      active: true
    },
    {
      id: 1,
      name: 'In Revision',
      active: false
    },
    {
      id: 2,
      name: 'Completed',
      active: false
    },
    {
      id: 3,
      name: 'Confirmed',
      active: false
    },
    {
      id: 4,
      name: 'Disputed',
      active: false
    },
    {
      id: 5,
      name: 'Cancelled',
      active: false
    }
  ]

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
    if (this.userView) this.getUserOrderList(this.userService.getUserObject().id);
  }

  isUserView() {
    return !this.userService.isUserAdmin();
  }

  getUserOrderList(id) {
    this.orderService.getOrderByUserId(id)
      .subscribe((res: any) => {
        if (res.success) {
          this.orderList = res.data;
          this.getFilteredOrders(this.activeTab);
        }
      }, (err: any) => {
      });
  }

  getFilteredOrders(tab) {
    this.filteredOrders = this.orderList.filter((value) => value.status === tab.toString());
  }

  changeTab(id){
    this.activeTab = this.tabs.findIndex((value) => value.id === id);
    this.tabs.map((value) => { value.active = false; });
    this.tabs[this.activeTab].active = true;
    this.getFilteredOrders(this.activeTab);
  }
}
