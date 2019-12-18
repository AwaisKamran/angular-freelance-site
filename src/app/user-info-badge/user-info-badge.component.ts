import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { CountryService } from '../services/country.service';
import { RatingService } from '../services/rating.service';

@Component({
  selector: 'app-user-info-badge',
  templateUrl: './user-info-badge.component.html',
  styleUrls: ['./user-info-badge.component.css']
})
export class UserInfoBadgeComponent implements OnInit {
  public starsCount = [];
  public user: any = undefined;
  public userImage: string = "assets/images/profile-pic.png";

  constructor(
    public userService: UserService,
    public countryService: CountryService,
    public ratingService: RatingService
  ) { 
    this.starsCount = new Array(5).fill(false);
    this.fetchUserAverageRating(this.userService.getUserObject().id);
    this.fetchDetails();
  }

  fetchUserAverageRating(id){
    return new Promise((resolve, reject)=>{
      this.ratingService.getAverageRating(id)
      .subscribe((res: any) => {
        if(res.success){
          this.userService.userRating = parseInt(res.data);
          for(let i=0; i< this.userService.userRating; i++ ){
            this.starsCount[i] = true;
          }
          resolve();
        }  
        else{
          reject();
        }
      }, (err: any) => {
        reject();
      });
    });
  }

  fetchDetails(){
    this.user = this.userService.getUserObject();
    this.userImage = this.userService.getLoggedInUserImage();
    this.userImage = `url(${this.userImage})`;
    this.userImage += ',url(assets/images/profile-pic.png)';
  }

  ngOnInit() {
    let count = 5 - parseInt(this.user.rating);
    this.starsCount = new Array(count);
  }

  getCountryName(){
    return this.userService.getUserObject().countryName;
  }

  getCountryFlag(){
    return `url(${this.userService.getUserObject().flag})`;
  }
}
