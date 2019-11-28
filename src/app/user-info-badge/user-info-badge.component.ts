import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-badge',
  templateUrl: './user-info-badge.component.html',
  styleUrls: ['./user-info-badge.component.css']
})
export class UserInfoBadgeComponent implements OnInit {
  public stars = [];
  constructor() { }

  ngOnInit() {
    this.stars = new Array(5);
  }

}
