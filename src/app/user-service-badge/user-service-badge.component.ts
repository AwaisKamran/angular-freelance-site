import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-user-service-badge',
  templateUrl: './user-service-badge.component.html',
  styleUrls: ['./user-service-badge.component.css']
})
export class UserServiceBadgeComponent implements OnInit {
  @Input() service: any;
  @Input() buyService: boolean; 

  @Output() openDialog: EventEmitter<any> = new EventEmitter();
  @Output() loadServices: EventEmitter<any> = new EventEmitter();

  constructor(
    public orderService: OrderService,
    public serviceService: ServicesService,
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

  deleteService(id){
    if(confirm("Are you sure you want to delete this service?")){
      this.serviceService.deleteService({ "serviceId": id })
      .subscribe((res: any) => {
        if(res.success){
          this.loadServices.emit();
        }  
      }, (err: any) => {
      });
    }
  }
}
