import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { BidService } from "../services/bid.service";
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

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public bidService: BidService,
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

  acceptBid(id){
    this.bidService.acceptBid(id)
    .subscribe((res: any) => {
      if(res.success){
      }  
    }, (err: any) => {
    });
  }
}
