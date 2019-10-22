import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-mini-badge',
  templateUrl: './user-mini-badge.component.html',
  styleUrls: ['./user-mini-badge.component.css']
})
export class UserMiniBadgeComponent implements OnInit {

  @Input() userName: string;
  @Input() userQuote: string;
  @Input() userPosition: string;
  @Input() userRating: number;
  public stars = [];

  constructor() { }

  ngOnInit() {
    this.stars = new Array(this.userRating);
  }
}
