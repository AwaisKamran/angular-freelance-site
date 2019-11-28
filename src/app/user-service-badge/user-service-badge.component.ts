import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-service-badge',
  templateUrl: './user-service-badge.component.html',
  styleUrls: ['./user-service-badge.component.css']
})
export class UserServiceBadgeComponent implements OnInit {

  @Input() service: any;
  @Input() buyService: boolean; 

  constructor() { }

  ngOnInit() {
  }

}
