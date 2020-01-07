import { Component, OnInit, Input } from '@angular/core';
import { QualificationService } from '../services/qualification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {
  @Input() user: string;
  public qualifications = [];

  constructor(
    public qualificationService: QualificationService,
    public userService: UserService
  ) {
  }

  ngOnInit() {
    if(this.user) this.fetchQualifications(this.user);
    else this.fetchQualifications(this.userService.user.id);
  }

  fetchQualifications(id){
    this.qualificationService.getQualification(id)
    .subscribe((res: any) => {
      if(res.success){
        this.qualifications = res.data;
      }  
      else{
        console.log("Error uploading image.");
      }
    }, (err: any) => {
      console.log("Error uploading image.");
    });
  }

}
