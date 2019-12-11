import { Component, OnInit, Input } from '@angular/core';
import { format, addHours, addDays, formatDistance } from 'date-fns'
import { ConstantsService } from '../services/constants.service';
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

  constructor(
    public constantsService: ConstantsService,
    public orderService: OrderService,
    public router: Router
  ) { }

  ngOnInit() {

    this.serviceImageProfile = `url(${this.constantsService.getImageUrl(this.order.serviceId)})`;
    this.serviceImageProfile += ',url(assets/images/placeholder.jpg)';

    this.imageProfile = `url(${this.constantsService.getServiceImageUrl(this.order.user.id)})`;
    this.imageProfile += ',url(assets/images/profile-pic.png)';

    this.date = formatDistance(addHours(new Date(), this.order.service.minimumHours), new Date());
  }

  viewOrder(order){
    this.orderService.clickedOrder = this.order;
    this.router.navigate([`order-page/${order.id}`]);
  }
}
