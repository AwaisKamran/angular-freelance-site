import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) {
    this.url = this.constantsService.url;
  }

  addRating(data){
    return this.http.post(`${this.url}api/rating/addRating.php`, { "data": data });
  }

  getUserRatings(userId){
    return this.http.get(`${this.url}api/rating/getRating.php?userId=${userId}`);
  }

  getOrderRating(userId, orderId){
    return this.http.get(`${this.url}api/rating/getRating.php?userId=${userId}&&orderId=${orderId}`);
  }
}
