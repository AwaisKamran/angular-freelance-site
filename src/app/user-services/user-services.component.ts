import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { ServicesService } from '../services/services.service';
import { ImageService } from '../services/image.service';
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.css']
})
export class UserServicesComponent implements OnInit {
  @ViewChild('fileDiv', { static: false}) fileDiv: ElementRef<HTMLElement>;

  public stars = [];
  public IsServiceView = true;
  public serviceLoading = false;
  public subcategories = [];
  public filteredSubcategories = [];
  public categories = [];
  public userServices = [];
  public missingField = false;
  public serviceSuccess = false;
  public serviceError = false;
  public file: File;
  public imageProfile: any = "assets/images/placeholder.jpg";
  public url: any;

  public data = {
    title: undefined,
    description: undefined,
    hourlyCost: undefined,
    minimumHours: undefined,
    categoryId: "-1",
    subCategoryId: "-1",
    userId: JSON.parse(localStorage.getItem("user")).id
  };

  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public servicesService: ServicesService,
    public imageService: ImageService,
    public constantsService: ConstantsService
  ) { 
    this.getUserServices();
    this.getCategories();
    this.getSubCategories();
    this.url = this.constantsService.url;
  }

  ngOnInit() {
    this.stars = new Array(5);
  }

  addService(){
    this.IsServiceView = !this.IsServiceView;
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((res: any) => {
        if(res.success){
          this.categories = res.data;
        }  
      }, (err: any) => {
      });
  }

  getSubCategories(){
    this.subCategoryService.getSubCategories()
    .subscribe((res: any) => {
      if(res.success){
        this.subcategories = res.data;
      }  
    }, (err: any) => {
    });
  }

  getUserServices(){
    this.servicesService.getUserServicesById(this.data.userId)
    .subscribe((res: any) => {
      if(res.success && res.data.length > 0){
        for (const service of res.data) {
          service.image = this.constantsService.getImageUrl(service.id);
        }
        this.userServices = res.data;
      }
    }, (err: any) => {
    });
  }

  categoryChanged(){
    let container = this;
    this.filteredSubcategories = this.subcategories.filter(function(element){
      return element.category.id === container.data.categoryId;
    });
  }

  createService(){
    if(
      this.data.categoryId &&
      this.data.subCategoryId &&
      this.data.title &&
      this.data.description &&
      this.data.hourlyCost &&
      this.data.minimumHours
    ){
      this.missingField = false;
      this.servicesService.createService(this.data)
      .subscribe((res: any) => {
        if(res.success){
          this.serviceSuccess = true;
          this.serviceError = false;
          this.clearData();
          if(this.file) this.saveServiceImage(res.data);
        }  
        else{
          this.serviceSuccess = false;
          this.serviceError = true;
        }
      }, (err: any) => {
        this.serviceSuccess = false;
        this.serviceError = true;
      });
    }
    else{
      this.missingField = true;
    }
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageProfile = reader.result;
    reader.readAsDataURL(this.file);
  }

  saveServiceImage(serviceId){
    const formData = new FormData();
    formData.append('fileToUpload', this.file);
    formData.append('id', serviceId);
    formData.append('folder', 'service');

    this.imageService.saveImage(formData)
    .subscribe((res: any) => {
      if(res.success){}  
      else{
        console.log("Error uploading image.");
      }
    }, (err: any) => {
      console.log("Error uploading image.");
    });
  }

  openFileExplorer(){
    let el: HTMLElement = this.fileDiv.nativeElement;
    el.click();
  }

  clearData(){
    this.data.title = undefined;
    this.data.description = undefined;
    this.data.hourlyCost = undefined;
    this.data.minimumHours = undefined;
    this.data.categoryId = "-1";
    this.data.subCategoryId = "-1";
    this.imageProfile = "assets/images/placeholder.jpg";
  }
}
