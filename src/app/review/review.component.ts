import { Component, OnInit, Input } from '@angular/core';
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
  @Input() user: string; 

  constructor(
    public userService: UserService,
    public constantsService: ConstantsService,
    public ratingService: RatingService,
  ) {  
  }

  ngOnInit(){
    if(this.user) this.fetchRatings(this.user);
    else this.fetchRatings(this.userService.user.id);
  }

  fetchRatings(id){
    this.ratingService.getUserRatings(id)
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.reviewList = res.data;
          for(let i=0; i<this.reviewList.length; i++){
            this.reviewList[i].rating = new Array(parseInt(this.reviewList[i].rating));
            this.reviewList[i].reviewerImage = `url(${this.constantsService.getImageUrl(this.reviewList[i].userId)}), url(assets/images/profile-pic.png)`;
          }
        }
      }, (error) => {
      }
    );
  }
}
