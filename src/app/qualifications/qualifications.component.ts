import { Component, OnInit } from '@angular/core';
import { QualificationService } from '../services/qualification.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})
export class QualificationsComponent implements OnInit {
  public qualifications = [];

  constructor(
    public qualificationService: QualificationService,
    public userService: UserService
  ) {
    this.fetchQualifications();
  }

  ngOnInit() {
  }

  fetchQualifications(){
    this.qualificationService.getQualification(this.userService.user.id)
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
