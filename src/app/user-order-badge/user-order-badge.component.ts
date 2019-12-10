import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-order-badge',
  templateUrl: './user-order-badge.component.html',
  styleUrls: ['./user-order-badge.component.css']
})
export class UserOrderBadgeComponent implements OnInit {
  @Input() order: any;
  constructor() { }

  ngOnInit() {
  }

}
