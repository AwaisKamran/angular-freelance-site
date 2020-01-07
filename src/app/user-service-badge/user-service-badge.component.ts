import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-service-badge',
  templateUrl: './user-service-badge.component.html',
  styleUrls: ['./user-service-badge.component.css']
})
export class UserServiceBadgeComponent implements OnInit {
  @Input() service: any;
  @Input() buyService: boolean; 
  @Output() openDialog: EventEmitter<any> = new EventEmitter();

  constructor(
    public orderService: OrderService,
    public router: Router
  ) {
   }

  ngOnInit() {
  }

  showDataDialog(service){
    this.openDialog.emit(service);
  }

  navigateToUserProfile(id){
    this.router.navigate([`/user-profile/${id}`]);
  }
}
