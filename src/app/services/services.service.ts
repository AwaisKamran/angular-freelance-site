import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  createService(data){
    return this.http.post(`${this.url}api/service/addService.php`, { "data": data });
  }

  getUserServicesById(id){
    return this.http.get(`${this.url}api/service/getUserServicesById.php?userId=${id}`);
  }

  getUserServicesByCategoryId(id){
    return this.http.get(`${this.url}api/service/getUserServicesByCategoryId.php?categoryId=${id}`);
  }
  
  getFilteredUserServices(data){
    return this.http.post(`${this.url}api/service/getFilteredUserServices.php`, {"data": data });
  }

  searchUserServices(data){
    return this.http.post(`${this.url}api/service/searchUserService.php`, { "data": data });
  }
}
