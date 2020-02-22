import { Component, OnInit, Input } from '@angular/core';
import { format, addHours, addDays, formatDistance } from 'date-fns'
import { ConstantsService } from '../services/constants.service';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-order-badge',
  templateUrl: './user-order-badge.component.html',
  styleUrls: ['./user-order-badge.component.css']
})
export class UserOrderBadgeComponent implements OnInit {
  @Input() order: any;
  public imageProfile = null;
  public serviceImageProfile = null;
  public date = null;
  public currencySymbol: string;

  constructor(
    public constantsService: ConstantsService,
    public userService: UserService,
    public orderService: OrderService,
    public router: Router
  ) { 
    this.currencySymbol = JSON.parse(localStorage.getItem('user')).currencySymbol;
  }

  ngOnInit() {

    this.serviceImageProfile = `url(${this.constantsService.getServiceImageUrl(this.order.serviceId)})`;
    this.serviceImageProfile += ',url(assets/images/placeholder.jpg)';
    
    this.imageProfile = `url(${this.constantsService.getImageUrl(this.order.user.id)})`;
    this.imageProfile += ',url(assets/images/profile-pic.png)';

    this.date = formatDistance(addHours(new Date(), this.order.service.minimumHours), new Date());
  }

  viewOrder(order){
    this.orderService.clickedOrder = this.order;
    this.router.navigate([`order-page/${order.id}/${this.userService.getUserObject().id}`]);
  }
}
