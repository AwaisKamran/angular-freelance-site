import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { SubCategoryService } from '../services/sub-category.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {
  public categories: any = [];
  public subcategories:any = [];
  public filteredSubcategories = [];
  public orderSuccessFlag: boolean = false;
  public orderErrorFlag: boolean = false;
  public orderMissingFieldWarning: boolean = false;
  public currency: string;
  public currencySymbol: string;

  public data = {
    categoryId: "-1",
    subCategoryId: "-1",
    hoursRequired: undefined,
    budget: undefined,
    orderInstructions: undefined,
    serviceId: null,
    status: "-1",
    orderCreatedBy: this.userService.getUserObject().id
  };

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public categoryService: CategoryService,
    public subCategoryService: SubCategoryService,
    public orderService: OrderService,
    public userService: UserService
  ) { 
    this.getCategories();
    this.getSubCategories();
    this.currency = this.userService.getUserObject().currency;
    this.currencySymbol = this.userService.getUserObject().currencySymbol;
  }

  ngOnInit() { 
  }

  navigateToDashboard(){
    this.router.navigate([`/dashboard`]);
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

  resetFields(){
    this.data = {
      categoryId: "-1",
      subCategoryId: "-1",
      hoursRequired: undefined,
      budget: undefined,
      orderInstructions: undefined,
      serviceId: null,
      orderCreatedBy: null,
      status: "-1"
    };
  }

  addJob(){
    if(this.data.categoryId === "-1") this.data.categoryId = undefined;
    if(this.data.subCategoryId === "-1") this.data.subCategoryId = undefined;

    if(this.data.categoryId && this.data.subCategoryId && this.data.budget && this.data.hoursRequired){
      this.orderService.createOrder(this.data)
      .subscribe((res: any) => {
        if(res.success){
          this.orderMissingFieldWarning = false;
          this.orderSuccessFlag = true;
          this.orderErrorFlag = false;
          this.resetFields();
        }
        else{
          this.orderMissingFieldWarning = false;
          this.orderSuccessFlag = false;
          this.orderErrorFlag = true;
        }
      }, (err: any) => {
        this.orderMissingFieldWarning = false;
        this.orderSuccessFlag = false;
        this.orderErrorFlag = true;
      });
    }
    else{
      this.orderMissingFieldWarning = true;
      this.orderSuccessFlag = false;
      this.orderErrorFlag = false;
    }
  }
}
