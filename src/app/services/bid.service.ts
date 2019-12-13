
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

  getUnassignedOrders(id){
    return this.http.get(`${this.url}api/order/getOrdersByUserId.php?userId=${id}`);
  }

  getBidsByOrderId(id){
    return this.http.get(`${this.url}api/order/getBidsByOrderId.php?orderId=${id}`);
  }

  createBid(data){
    return this.http.post(`${this.url}api/bid/addBid.php`, { "data": data});
  }

  acceptBid(data){
    return this.http.post(`${this.url}api/bid/acceptBid.php`, { "data": data});
  }
}
