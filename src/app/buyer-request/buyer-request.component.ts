import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { OrderService } from "../services/order.service";
import { BidService } from "../services/bid.service";
import { ServicesService } from "../services/services.service";
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
  public loadingServices: boolean = false;
  public orderList: any = [];
  public services: any = [];
  public data: any = {
    orderId: undefined,
    categoryId: undefined,
    serviceId: "-1",
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
    public orderService: OrderService,
    public servicesService: ServicesService
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
        console.log(this.orderList);
      }  
    }, (err: any) => {
    });
  }

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

  onOpenDialog(id, categoryId){
    this.loadingServices = true;
    this.data.orderId = id;
    this.data.categoryId = categoryId;
    this.getServicesByCatgeoryId(categoryId);
    this.dialogOpened = true;
  }

  getServicesByCatgeoryId(id){
    this.servicesService.getUserServicesByCategoryId(id)
    .subscribe((res: any) => {
      if(res.success){
        this.loadingServices = false;
        this.services = res.data;
      }  
    }, (err: any) => {
    });
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
        this.resetFields();
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

  resetFields(){
      this.data.orderId= undefined,
      this.data.categoryId= undefined,
      this.data.serviceId= "-1",
      this.data.bidDescription= undefined,
      this.data.timeRequired= undefined,
      this.data.proposedBudget= undefined,
      this.data.proposedBy= this.userService.getUserObject().id  
  }
}