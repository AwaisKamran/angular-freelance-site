import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-mini-badge',
  templateUrl: './user-mini-badge.component.html',
  styleUrls: ['./user-mini-badge.component.css']
})
export class UserMiniBadgeComponent implements OnInit {
  @Input() id: string;
  @Input() userName: string;
  @Input() userQuote: string;
  @Input() userPosition: string;
  @Input() userRating: any;
  public stars: any = [];
  public userStyle: any = undefined;

  constructor() { }

  ngOnInit() {
    this.stars = new Array(parseInt(this.userRating));
    this.userStyle = {
      backgroundImage: `url(assets/images/dummy-profile-picture-${this.id}.jpg)`
    }
  }
}
