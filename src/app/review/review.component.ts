import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ConstantsService } from "../services/constants.service";
import { RatingService } from "../services/rating.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  public reviewList:any = [];

  constructor(
    public userService: UserService,
    public constantsService: ConstantsService,
    public ratingService: RatingService,
  ) { 
    this.ratingService.getUserRatings(this.userService.getUserObject().id)
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.reviewList = res.data;
        }
      }, (error) => {
      }
    );
  }

  ngOnInit() {
  }

}
