import { Component, OnInit, Input } from '@angular/core';
import { ExperienceService } from '../services/experience.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  public experiences = [];
  @Input() user: string; 
  
  constructor(
    public experienceService: ExperienceService,
    public userService: UserService
  ) { 
  }

  ngOnInit() {
    if(this.user) this.fetchExperiences(this.user);
    else this.fetchExperiences(this.userService.user.id);
  }

  fetchExperiences(id){
    this.experienceService.getExperience(id)
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
