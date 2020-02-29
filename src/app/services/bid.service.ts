
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class BidService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  getBidsByOrderId(id){
    return this.http.get(`${this.url}api/bid/getBidsByOrderId.php?orderId=${id}`);
  }

  createBid(data){
    return this.http.post(`${this.url}api/bid/addBid.php`, { "data": data});
  }

  acceptBid(data){
    return this.http.post(`${this.url}api/bid/acceptBid.php`, { "data": data});
  }

  deleteBids(data){
    return this.http.post(`${this.url}api/bid/deleteBids.php`, { "data": data});
  }

  deleteBidsByServiceId(data){
    return this.http.post(`${this.url}api/bid/deleteBidsByServiceId.php`, { "data": data});
  }
}
