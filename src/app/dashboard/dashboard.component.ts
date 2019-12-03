import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { ServicesService } from "../services/services.service";
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { ConstantsService } from '../services/constants.service';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public subcategories = [];
  public filteredSubcategories = [];
  public categories = [];
  public countries: any = [];
  public services: any = [];
  public url: any;
  public searching: boolean = false;
  public userView: boolean = false;
  
  public data = {
    categoryId: "-1",
    subCategoryId: "-1",
    country: "-1",
    city: undefined
  };

  constructor(
    public userService: UserService,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public constantsService: ConstantsService,
    public countryService: CountryService,
    public servicesService: ServicesService
  ) { 
    this.getCategories();
    this.getSubCategories();
    this.getCountries();
    this.url = this.constantsService.url;
  }

  ngOnInit() {
    this.userView = this.isUserView();
  }

  isUserView(){
    return !this.userService.isUserAdmin(); 
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      (res: any) => {
        this.countries = res;
        //this.data.country = 238;
      }, (error) => {
      }
    );
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

  categoryChanged(){
    let container = this;
    this.filteredSubcategories = this.subcategories.filter(function(element){
      return element.category.id === container.data.categoryId;
    });
  }

  fetchServices(){
    let data = {
      categoryId: undefined,
      subCategoryId: undefined,
      country: undefined,
      city: undefined
    };

    if(this.data.categoryId !== "-1") data.categoryId = this.data.categoryId;
    if(this.data.subCategoryId !== "-1") data.subCategoryId = this.data.subCategoryId;
    if(this.data.country && this.data.country !== "-1") data.country = this.data.country;
    if(this.data.city) data.city = this.data.city;

    this.servicesService.getFilteredUserServices(data)
    .subscribe((res: any) => {
      if(res.success){
        for (const service of res.data) {
          service.image = this.constantsService.getImageUrl(service.id);
        }
        this.services = res.data;
      }  
    }, (err: any) => {
    });
  }


}
