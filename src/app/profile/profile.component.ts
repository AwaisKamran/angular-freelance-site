
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { ServicesService } from '../services/services.service';
import { ImageService } from '../services/image.service';
import { UserService } from '../services/user.service';
import { ConstantsService } from '../services/constants.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  public stars = [];
  public userServices = [];
  public url: any;
  public userId: string = undefined;
  public showQualifications: boolean = true;
  public showExperience: boolean = true;
  public showReportFlag: boolean = false;

  public data = {
    userId: JSON.parse(localStorage.getItem("user")).id
  };

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public servicesService: ServicesService,
    public imageService: ImageService,
    public userService: UserService,
    public constantsService: ConstantsService
  ) { 
    this.url = this.constantsService.url;
  }

  isUserAdmin(){
    return this.userService.isUserAdmin();
  }

  ngOnInit() {
    this.stars = new Array(5);
    let container = this;

    this.route.params.subscribe(params => {
      container.userId = params['id'];
      if(params['id']){
        this.getUserById(container.userId);
        this.showReportFlag = true;
      }
      else{
        if(this.isUserAdmin()) {
          this.showQualifications = false;
          this.showExperience = false;
        }
        this.userId = this.data.userId;
        this.getUserServices(this.data.userId);
        this.showReportFlag = false;
      }
    });
  }

  getUserById(id){
    this.userService.getUserById(id)
    .subscribe((res: any) => {
      if(res.success){
        if(res.data.type === "0"){
          this.showQualifications = false;
          this.showExperience = false;
        } 
        else{
          this.showQualifications = true;
          this.showExperience = true;
        }
        this.getUserServices(id);
      }
    }, (err: any) => {
    });
  }

  getUserServices(id){
    this.servicesService.getUserServicesById(id)
    .subscribe((res: any) => {
      if(res.success && res.data.length > 0){
        for (const service of res.data) {
          service.image = this.constantsService.getServiceImageUrl(service.id);
        }
        this.userServices = res.data;
      }
    }, (err: any) => {
    });
  }
}
