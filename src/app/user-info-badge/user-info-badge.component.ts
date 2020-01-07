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
  @Input() userId: string;
  public starsCount = [];
  public user: any = undefined;
  public userImage: string = "assets/images/profile-pic.png";

  constructor(
    public userService: UserService,
    public countryService: CountryService,
    public ratingService: RatingService
  ) { 
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

  fetchDetailsByUserId(id){
    this.userService.getUserById(id)
      .subscribe((res: any) => {
        if(res.success){
          this.user = res.data;
          console.log(this.user);
        }
      }, (err: any) => {
      });
  }

  ngOnInit() {
    if(this.userId){
      this.fetchUserAverageRating(this.userId);
      this.fetchDetailsByUserId(this.userId);
    }
    else {
      this.fetchUserAverageRating(this.userService.getUserObject().id);
      this.fetchDetails();
      
      this.starsCount = new Array(5).fill(false);
      let count = 5 - parseInt(this.user.rating);
      this.starsCount = new Array(count);
    }
  }

  getCountryName(){
    return this.userService.getUserObject().countryName;
  }

  getCountryFlag(){
    return `url(${this.userService.getUserObject().flag})`;
  }
}
