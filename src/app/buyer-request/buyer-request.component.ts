import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { OrderService } from "../services/order.service";
import { BidService } from "../services/bid.service";
import { ConstantsService } from "../services/constants.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buyer-request',
  templateUrl: './buyer-request.component.html',
  styleUrls: ['./buyer-request.component.css']
})
export class BuyerRequestComponent implements OnInit {
  public dialogOpened: boolean = false;
  public dialogSuccess: boolean = false;
  public dialogError: boolean = false;
  public orderList: any = [];
  public data: any = {
    orderId: undefined,
    bidDescription: undefined,
    timeRequired: undefined,
    proposedBudget: undefined,
    proposedBy: this.userService.getUserObject().id
  };

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public constantsService: ConstantsService,
    public bidService: BidService,
    public orderService: OrderService
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

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

  onOpenDialog(id){
    this.data.orderId = id;
    this.dialogOpened = true;
  }

  toggleDialog(){
    this.dialogOpened = !this.dialogOpened;
  }

  submitBid(){
    this.bidService.createBid(this.data)
    .subscribe((res: any) => {
      if(res.success){
        this.dialogSuccess = true;
        this.dialogError = false;
      }  
      else{
        this.dialogSuccess = false;
        this.dialogError = true;
      }
    }, (err: any) => {
      this.dialogSuccess = false;
      this.dialogError = true;
    });
  }

  getUserImage(id){
    return `url(${this.constantsService.getImageUrl(id)}), url(assets/images/profile-pic.png)`;
  }
}