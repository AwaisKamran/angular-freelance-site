import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-info-badge',
  templateUrl: './user-info-badge.component.html',
  styleUrls: ['./user-info-badge.component.css']
})
export class UserInfoBadgeComponent implements OnInit {
  public stars = [];
  public starsCount = [];
  public user: any = undefined;
  public userImage: string = "assets/images/dummy-profile-picture.jpg";

  constructor(
    public userService: UserService,
  ) { 
    this.user = this.userService.getUserObject();
    this.userImage = this.userService.getLoggedInUserImage();
  }

  ngOnInit() {
    let count = 5 - parseInt(this.user.rating);
    if(parseInt(this.user.rating) > 0) this.stars = new Array(this.user.rating);
    this.starsCount = new Array(count);
  }

}
