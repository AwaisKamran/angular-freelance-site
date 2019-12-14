import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { OrderService } from '../services/order.service';
import { DropdownService } from "../services/dropdown.service";
import { UserService } from "../services/user.service";
import { ServicesService } from "../services/services.service";
import { ConstantsService } from '../services/constants.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public subcategories = [];
  public filteredSubcategories = [];
  public categories = [];
  public categoryId: any = undefined;
  public subCategoryId: any = undefined;
  public dialogData: any = undefined;
  public dialogOpened: boolean = false;
  public orderCreatedSuccess: boolean = false;
  public orderCreatedError: boolean = false;
  public searching: boolean = false;
  public services: any = [];

  public data = {
    categoryId: "-1",
    subCategoryId: "-1",
    country: "-1",
    city: undefined
  };
  
  constructor(
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public orderService: OrderService,
    public dropDownService: DropdownService,
    public userService: UserService,
    public servicesService: ServicesService,
    public constantsService: ConstantsService
  ) {
    this.getCategories();
    this.getSubCategories();

    this.data.country = this.userService.getUserObject().country;
    this.data.city = this.userService.getUserObject().city;
  }

  ngOnInit() {
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

  onOpenDialog(event){
    this.dialogData = event;
    this.dialogOpened = true;
  }

  toggleDialog(){
    this.dialogOpened = !this.dialogOpened;
  }

  closeDropDown(){
    this.dropDownService.resetDropdowns();
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
          service.image = this.constantsService.getServiceImageUrl(service.id);
          service.user.image = `url(${this.constantsService.getImageUrl(service.user.id)})`;
          service.user.image += ", url(assets/images/profile-pic.png)";
        }
        this.services = res.data;
      }  
    }, (err: any) => {
    });
  }

  buyOrder(){
    let data = {
      serviceId: this.dialogData.id,
      hoursRequired : this.dialogData.minimumHours,
      budget : parseFloat(this.dialogData.hourlyCost) * parseFloat(this.dialogData.minimumHours),
      orderInstructions : null,
      categoryId : this.dialogData.categoryId,
      subCategoryId : null,
      status : 0,
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
