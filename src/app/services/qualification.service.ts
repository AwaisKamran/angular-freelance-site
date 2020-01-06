import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  addQualification(data){
    return this.http.post(`${this.url}api/qualification/addQualification.php`, { "data": data });
  }

  getQualification(id){
    return this.http.get(`${this.url}api/qualification/getQualifications.php?userId=${id}`);
  }
}
