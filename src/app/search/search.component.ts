import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { OrderService } from '../services/order.service';
import { DropdownService } from "../services/dropdown.service";
import { UserService } from "../services/user.service";
import { ServicesService } from "../services/services.service";
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

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
    this.getCategories()
    .then(()=> this.getSubCategories())
    .then(()=> {
      if (localStorage.getItem("searchItemParent")) {
        this.data.categoryId = this.getCategoryId(localStorage.getItem("searchItemParent"));
        this.categoryChanged();
      }
    });

    this.data.country = this.userService.getUserObject().country;
    this.data.city = this.userService.getUserObject().city;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    localStorage.removeItem("searchItem");
    localStorage.removeItem("searchParentItem");
  }

  getCategoryId(value) {
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].categoryName === value) return this.categories[i].id;
    }
  }

  getSubCategoryId(value){
    for (let i = 0; i < this.filteredSubcategories.length; i++) {
      if (this.filteredSubcategories[i].subCategoryName === value) return this.filteredSubcategories[i].id;
    }
  }

  getCategories() {
    return new Promise((resolve, reject) => {
      this.categoryService.getCategories()
        .subscribe((res: any) => {
          if (res.success) {
            this.categories = res.data;
            resolve();
          }
          else {
            reject();
          }
        }, (err: any) => {
          reject();
        });
    });
  }

  getSubCategories() {
    return new Promise((resolve, reject) => {
      this.subCategoryService.getSubCategories()
        .subscribe((res: any) => {
          if (res.success) {
            this.subcategories = res.data;
            resolve();
          }
          else{
            reject();
          }
        }, (err: any) => {
          reject();
        });
    });
  }

  categoryChanged() {
    let container = this;
    this.filteredSubcategories = this.subcategories.filter(function (element) {
      return element.category.id === container.data.categoryId;
    });

    if (localStorage.getItem("searchItem")) {
      this.data.subCategoryId = this.getSubCategoryId(localStorage.getItem("searchItem"));
      this.fetchServices();
    }
  }

  onOpenDialog(event) {
    this.dialogData = event;
    this.dialogOpened = true;
  }

  toggleDialog() {
    this.dialogOpened = !this.dialogOpened;
  }

  closeDropDown() {
    this.dropDownService.resetDropdowns();
  }

  fetchServices() {
    let data = {
      categoryId: undefined,
      subCategoryId: undefined,
      country: undefined,
      city: undefined
    };

    if (this.data.categoryId !== "-1") data.categoryId = this.data.categoryId;
    if (this.data.subCategoryId !== "-1") data.subCategoryId = this.data.subCategoryId;
    if (this.data.country && this.data.country !== "-1") data.country = this.data.country;
    if (this.data.city) data.city = this.data.city;

    this.servicesService.getFilteredUserServices(data)
      .subscribe((res: any) => {
        if (res.success) {
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

  buyOrder() {
    let data = {
      serviceId: this.dialogData.id,
      hoursRequired: this.dialogData.minimumHours,
      budget: parseFloat(this.dialogData.hourlyCost) * parseFloat(this.dialogData.minimumHours),
      orderInstructions: null,
      categoryId: this.dialogData.categoryId,
      subCategoryId: null,
      status: -1,
      type: null,
      orderCreatedBy: this.userService.getUserObject().id
    };

    this.orderService.createOrder(data)
      .subscribe((res: any) => {
        if (res.success) {
          this.orderCreatedSuccess = true;
          this.orderCreatedError = false;
        }
        else {
          this.orderCreatedSuccess = false;
          this.orderCreatedError = true;
        }
      }, (err: any) => {
        this.orderCreatedSuccess = false;
        this.orderCreatedError = true;
      });
  }
}
