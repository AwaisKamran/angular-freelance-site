import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { ConstantsService } from '../services/constants.service';
import { UserService } from '../services/user.service';
import { format, compareAsc } from 'date-fns'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() orderId:string;
  @Input() disabled: boolean;

  public commentText: string = undefined;
  public commentList: any = [];

  constructor(
    public commentsService: CommentsService,
    public userService: UserService,
    public constantService: ConstantsService
  ) { }

  ngOnInit() {
    this.getComments();
  }

  addComment(){
    let data = {
      userId: this.userService.getUserObject().id,
      orderId: this.orderId,
      commentText: this.commentText,
      dateTime: new Date()
    };

    this.commentsService.createComment(data)
    .subscribe((res: any) => { 
      if(res.success){
        this.commentList.unshift(data);
        this.commentText = "";
      }
    }, (err: any) => {
    });
  }

  getComments(){
    this.commentsService.getCommentsByOrderId(this.orderId)
    .subscribe((res: any) => { 
      if(res.success){
        this.commentList = res.data;
      }
    }, (err: any) => {
    });
  }

  getFormatDate(date){
    return format(new Date(date), 'dd/MM/yyyy h:mm aa');
  }

  getUserProfileImage(id){
    let image = `url(${this.constantService.getImageUrl(id)})`;
    image += ", url(assets/images/profile-pic.png)";
    return image;
  }
}
