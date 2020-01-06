import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  addExperience(data){
    return this.http.post(`${this.url}api/experience/addExperience.php`, { "data": data });
  }

  getExperience(id){
    return this.http.get(`${this.url}api/experience/getExperience.php?userId=${id}`);
  }
}
