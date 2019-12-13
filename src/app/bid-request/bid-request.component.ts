import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bid-request',
  templateUrl: './bid-request.component.html',
  styleUrls: ['./bid-request.component.css']
})
export class BidRequestComponent implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public userService: UserService
  ) { }

  ngOnInit() {
  }

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
  }

  getBidsByOrderId(){

  }

  acceptBid(){
    
  }
}
