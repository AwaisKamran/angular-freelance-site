import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from "../services/user.service";
import { ServicesService } from "../services/services.service";
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { ConstantsService } from '../services/constants.service';
import { CountryService } from '../services/country.service';
import { OrderService } from '../services/order.service';
import { DropdownService } from "../services/dropdown.service";

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
  public dialogData: any = undefined;
  public dialogOpened: boolean = false;
  public orderCreatedSuccess: boolean = false;
  public orderCreatedError: boolean = false;
  public orderList: any = [];

  
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
    public servicesService: ServicesService,
    public orderService: OrderService,
    public dropDownService: DropdownService
  ) { 
    this.getCategories();
    this.getSubCategories();
    this.getCountries();
    this.url = this.constantsService.url;

    this.data.country = this.userService.getUserObject().country;
    this.data.city = this.userService.getUserObject().city;
  }

  ngOnInit() {
    this.userView = this.isUserView();
    if(this.userView) this.getUserOrderList(this.userService.getUserObject().id);
  }

  isUserView(){
    return !this.userService.isUserAdmin(); 
  }

  getCountries() {
    this.countryService.getCountries().subscribe(
      (res: any) => {
        this.countries = res;
        this.countryService.data = res;
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

  onOpenDialog(event){
    this.dialogData = event;
    this.dialogOpened = true;
  }

  toggleDialog(){
    this.dialogOpened = !this.dialogOpened;
  }

  getUserOrderList(id){
    this.orderService.getOrderByUserId(id)
    .subscribe((res: any) => {
      if(res.success){
        this.orderList = res.data;
      }  
    }, (err: any) => {
    });
  }

  closeDropDown(){
    this.dropDownService.resetDropdowns();
  }

  buyOrder(){
    let data = {
      serviceId: this.dialogData.id,
      hourRequired : null,
      budget : null,
      orderInstructions : null,
      categoryId : null,
      subCategoryId : null,
      status : null,
      type : null,
      orderCreatedBy: this.userService.getUserObject().id
    };

    this.orderService.createOrder(data)
    .subscribe((res: any) => {
      if(res.success){
        this.orderCreatedSuccess = true;
        this.orderCreatedError = false;
      }  
      else{
        this.orderCreatedSuccess = false;
        this.orderCreatedError = true;
      }
    }, (err: any) => {
      this.orderCreatedSuccess = false;
      this.orderCreatedError = true;
    });
  }
}
