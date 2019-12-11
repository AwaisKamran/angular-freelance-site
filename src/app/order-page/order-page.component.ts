import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  public id: string = null;
  public order: any = undefined;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService
  ) {
  }

  ngOnInit() {
    let container = this;
    this.order = this.orderService.clickedOrder;
    this.route.params.subscribe(params => {
      container.id = params['id'];
    });
  }
}
