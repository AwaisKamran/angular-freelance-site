import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../services/user.service";
import { ConstantsService } from "../services/constants.service";
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() display: boolean;
  @Input() orderCreatedBy: string;
  @Input() rating: number = 5;
  @Input() freelancerId: string;

  public ratingValue:any = [];
  public userImage: any;

  constructor(
    public userService: UserService,
    public constantService: ConstantsService
  ) { 
    this.userImage = `url(${this.constantService.getImageUrl(this.userService.getUserObject().id)})`;
    this.userImage += ',url(assets/images/profile-pic.png)';
    this.ratingValue = new Array(this.rating).fill(false);
  }

  ngOnInit() {
  }

  getRating(i){
    this.ratingValue = new Array(this.rating).fill(false);
    for(let j=0; j<=i; j++){
      this.ratingValue[j] = true;
    }
  }

  submitRating(){
    let data = {
      userId: undefined,
      rating: undefined
    };

    if(this.userService.isUserAdmin()){
      data.userId = this.freelancerId;
    }
    else{
      data.userId = this.orderCreatedBy;
    }

    this.userService.submitReview(data)
    .subscribe((res: any) => {
      if(res.success){
        alert("Here");
      }  
    }, (err: any) => {
    });
  }

}
