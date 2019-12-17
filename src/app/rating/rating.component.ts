import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from "../services/user.service";
import { ConstantsService } from "../services/constants.service";
import { RatingService } from "../services/rating.service";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() display: boolean;
  @Input() orderCreatedBy: string;
  @Input() rating: number = 5;
  @Input() orderId: number;
  @Input() freelancerId: string;
  @Output() rated = new EventEmitter()

  public ratingValue: any = [];
  public userImage: any;
  public ratingSubmittedSuccess: boolean = false;
  public ratingSubmittedError: boolean = false;
  public ratingComments: string;
  public ratingDigit;

  constructor(
    public userService: UserService,
    public constantService: ConstantsService,
    public ratingService: RatingService
  ) {
    this.userImage = `url(${this.constantService.getImageUrl(this.userService.getUserObject().id)})`;
    this.userImage += ',url(assets/images/profile-pic.png)';
    this.ratingValue = new Array(this.rating).fill(false);
  }

  ngOnInit() {
  }

  getRating(i) {
    this.ratingDigit = i;
    this.ratingValue = new Array(this.rating).fill(false);
    for (let j = 0; j <= i; j++) {
      this.ratingValue[j] = true;
    }
  }

  submitRating() {
    let data = {
      userId: undefined,
      rating: this.ratingDigit,
      orderId: this.orderId,
      ratingComments: this.ratingComments
    };

    if (this.userService.isUserAdmin()) {
      data.userId = this.freelancerId;
    }
    else {
      data.userId = this.orderCreatedBy;
    }

    this.ratingService.addRating(data)
    .subscribe((res: any) => {
        if (res.success) {
          this.ratingSubmittedSuccess = true;
          this.ratingSubmittedError = false;
          this.rated.emit(true);
        }
        else{
          this.ratingSubmittedSuccess = false;
          this.ratingSubmittedError = true;
        }
      }, (err: any) => {
        this.ratingSubmittedSuccess = false;
        this.ratingSubmittedError = true;
      });
  }
}
