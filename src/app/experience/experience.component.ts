import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public experiences = [];
  constructor(
    public experienceService: ExperienceService,
    public userService: UserService
  ) { 
    this.fetchExperiences();
  }

  ngOnInit() {
  }

  fetchExperiences(){
    this.experienceService.getExperience(this.userService.user.id)
    .subscribe((res: any) => {
      if(res.success){
        this.experiences = res.data;
      }  
      else{
        console.log("Error fetching experiences.");
      }
    }, (err: any) => {
      console.log("Error fetching experiences.");
    });
  }

}
