import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  public url: string;
  public clickedOrder: any = undefined;
  
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  createOrder(data){
    return this.http.post(`${this.url}api/order/addOrder.php`, { "data": data });
  }

  getOrderByUserId(id){
    return this.http.get(`${this.url}api/order/getOrdersByUserId.php?userId=${id}`);
  }

  getOrderByOrderId(userId, orderId){
    return this.http.get(`${this.url}api/order/getOrderByOrderId.php?userId=${userId}&&orderId=${orderId}`);
  }

  getOrderByStatus(status){
    return this.http.get(`${this.url}api/order/getOrdersByStatus.php?status=${status}`);
  }

  updateOrder(data){
    return this.http.post(`${this.url}api/order/assignOrder.php`, { "data": data });
  }
}
