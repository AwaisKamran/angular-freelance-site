import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  //public url: any = 'http://localhost/freelance-management/';
  public url: any = 'http://freelance.freelancehouseservices.com/awais/freelance-management/';
  constructor() { }

  getImageUrl(id){
    return `${this.url}uploads/service/${id}.jpg`;
  }

  getUserImageUrl(id){
    return `${this.url}uploads/service/${id}.jpg`;
  }
}
