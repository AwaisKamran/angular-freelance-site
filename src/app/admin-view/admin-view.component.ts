import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services/order.service";
import { ConstantsService } from "../services/constants.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  public orderList: any = [];
  constructor(
    public orderService: OrderService,
    public constantsService: ConstantsService,
    public router: Router
  ) { 
    this.fetchOrders();
  }

  ngOnInit() {
  }

  fetchOrders(){
    this.orderService.getUnAssignedOrders()
    .subscribe((res: any) => {
      if(res.success){
        this.orderList = res.data;
      }  
    }, (err: any) => {
    });
  }

  getUserImage(id){
    return `url(${this.constantsService.getImageUrl(id)}), url(assets/images/profile-pic.png)`;
  }

  navigateToBids(id){
    this.router.navigate([`/bid-request/${id}`]);
  }
}
