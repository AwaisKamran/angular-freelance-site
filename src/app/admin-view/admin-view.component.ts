import { Component, OnInit } from '@angular/core';
import { OrderService } from "../services/order.service";
import { ConstantsService } from "../services/constants.service";
import { UserService } from "../services/user.service";
import { Router } from '@angular/router';
import { format } from 'date-fns';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {
  public orderList: any = [];
  public filteredOrderList: any = [];
  public revised: number = 0;
  public delivered: number = 0;
  public progress: number = 0;
  public confirmed: number = 0;
  public new: number = 0;
  public disputed: number = 0;
  public currencySymbol: string;
  public filterValue: string;

  constructor(
    public orderService: OrderService,
    public constantsService: ConstantsService,
    public userService: UserService,
    public router: Router
  ) { 
    this.currencySymbol = JSON.parse(localStorage.getItem('user')).currencySymbol;
    this.fetchOrders();
  }

  ngOnInit() {
  }

  fetchOrders(){
    this.orderService.getUserOrderListHistory(this.userService.getUserObject().id)
    .subscribe((res: any) => {
      if(res.success){
        this.orderList = res.data;
        this.filteredOrderList = res.data;
        this.filterOrders('-1');
        this.processOrders();
      }  
    }, (err: any) => {
    });
  }

  processOrders(){
    for(let i=0; i<this.orderList.length; i++){
      if(this.orderList[i].status === '0') this.progress++;
      else if(this.orderList[i].status === '1') this.revised++
      else if(this.orderList[i].status === '2') this.delivered++;
      else if(this.orderList[i].status === '3') this.confirmed++;
      else if(this.orderList[i].status === '-1') this.new++;
      else if(this.orderList[i].status === '4') this.disputed++;
    }
  }

  filterOrders(status){
    this.filteredOrderList = this.orderList.filter((value)=>value.status === status);
  }

  getUserImage(id){
    return `url(${this.constantsService.getImageUrl(id)}), url(assets/images/profile-pic.png)`;
  }

  navigateToBids(id){
    this.router.navigate([`/bid-request/${id}`]);
  }

  formatDate(date){
    return format(new Date(date), 'dd/MM/yyyy');
  }

  navigateToOrderPage(order){
    if(order.serviceId){
      this.router.navigate([`/order-page/${order.id}/${order.freelancerId}`]);
    }
  }

  deleteOrder(id){
    if(confirm("Are you sure you want to delete your order request?")){
      this.orderService.deleteOrder({ "orderId": id })
      .subscribe((res: any) => {
        if(res.success){
          this.fetchOrders();
        }  
      }, (err: any) => {
      });
    }
  }
}
