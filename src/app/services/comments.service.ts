import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConstantsService } from './constants.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  public url: string;
  constructor(
    public http: HttpClient,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  createComment(data){
    return this.http.post(`${this.url}api/comment/addComment.php`, { "data": data });
  }

  getCommentsByOrderId(id){
    return this.http.get(`${this.url}api/comment/getCommentsByOrderId.php?orderId=${id}`);
  }
}
