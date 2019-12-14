import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
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
  public orderSuccessFlag: boolean = false;
  public orderErrorFlag: boolean = false;

  public data = {
    categoryId: "-1",
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
    public orderService: OrderService,
    public userService: UserService
  ) { 
    this.getCategories();
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

  resetFields(){
    this.data = {
      categoryId: "-1",
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
    this.orderService.createOrder(this.data)
      .subscribe((res: any) => {
        if(res.success){
          this.orderSuccessFlag = true;
          this.orderErrorFlag = false;
          this.resetFields();
        }
        else{
          this.orderSuccessFlag = false;
          this.orderErrorFlag = true;
        }
      }, (err: any) => {
        this.orderSuccessFlag = false;
        this.orderErrorFlag = true;
      });
  }
}
