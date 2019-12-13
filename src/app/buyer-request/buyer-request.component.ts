import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
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
    public userService: UserService
  ) { }

  ngOnInit() {
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
    
  }
}
