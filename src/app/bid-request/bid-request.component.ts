import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { BidService } from "../services/bid.service";
import { OrderService } from "../services/order.service";
import { ConstantsService } from "../services/constants.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-request',
  templateUrl: './bid-request.component.html',
  styleUrls: ['./bid-request.component.css']
})
export class BidRequestComponent implements OnInit {
  public bidList = [];
  public id: string = undefined;
  public bidSuccess: boolean = false;
  public bidError: boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public bidService: BidService,
    public orderService: OrderService,
    public constantsService: ConstantsService
  ) { }

  ngOnInit() {
    let container = this;
    this.route.params.subscribe(params => {
      container.id = params['id'];
      container.getBidsByOrderId(container.id);
    });
  }

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

  getBidsByOrderId(id){
    this.bidService.getBidsByOrderId(id)
    .subscribe((res: any) => {
      if(res.success){
        this.bidList = res.data;
      }  
    }, (err: any) => {
    });
  }

  getUserImage(id){
    return `url(${this.constantsService.getImageUrl(id)}), url(assets/images/profile-pic.png)`;
  }

  getServiceImage(id){
    return `url(${this.constantsService.getServiceImageUrl(id)}), url(assets/images/placeholder.jpg)`;
  }

  acceptBid(bid){
    let data = {
      bidId: bid.id
    };

    this.bidService.acceptBid(data)
    .subscribe((res: any) => {
      if(res.success){
        this.updateOrderById(bid.serviceId, bid.orderId, 0)
      }  
    }, (err: any) => {
    });
  }

  updateOrderById(serviceId, orderId, status){
    let data = {
      serviceId: serviceId,
      orderId: orderId,
      status: status
    };

    this.orderService.updateOrderById(data)
    .subscribe((res: any) => {
      if(res.success){
        this.bidSuccess = true;
        this.bidError = false;
      }  
      else{
        this.bidSuccess = false;
        this.bidError = true;
      }
    }, (err: any) => {
      this.bidSuccess = false;
      this.bidError = true;
    });
  }
}
