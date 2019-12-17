import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/user.service';
import { ConstantsService } from '../services/constants.service';
import { format, compareAsc } from 'date-fns';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  public id: string = null;
  public userId: string = null;
  public order: any = undefined;
  public file: File;
  public fileName: string;
  public orderStatusSuccess: Boolean = false;
  public orderStatusError: Boolean = false;
  public downloadLink: string;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public orderService: OrderService,
    public userService: UserService,
    public constantService: ConstantsService
  ) {
  }

  ngOnInit() {
    let container = this;
    this.order = this.orderService.clickedOrder;
    this.route.params.subscribe(params => {
      container.id = params['id'];
      container.getDownloadFileUrl(container.id);
      container.userId = params["userId"];
      if (!container.order) container.getUserOrder(container.userId, container.id);
    });
  }

  getDownloadFileUrl(id){
    this.orderService.getFileName(id)
      .subscribe((res: any) => {
        if (res.success) {
          this.fileName = res.data;
          this.downloadLink = this.constantService.getFileNameUrl(this.fileName);
        }
      }, (err: any) => {
      });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.file = file;
    }
  }

  formatDate(date) {
    return format(new Date(date), 'MM/dd/yyyy');
  }

  navigateToDashboard() {
    this.router.navigate([`/dashboard`]);
  }

  getServiceImage(id) {
    return `url(${this.constantService.getServiceImageUrl(id)})`;
  }

  getUserOrder(userId, orderId) {
    this.orderService.getOrderByOrderId(userId, orderId)
      .subscribe((res: any) => {
        if (res.success) {
          this.order = res.data;
        }
      }, (err: any) => {
      });
  }

  isAdmin() {
    return this.userService.isUserAdmin();
  }

  deliverOrder(id, status) {
    const formData = new FormData();
    formData.append('fileToUpload', this.file);

    this.orderService.deliverOrder(formData, id, status)
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.changeOrderStatus(id, 2);
        }
        else {
        }
      }, (error) => {
      }
    );
  }

  changeOrderStatus(id, status){
    let data = {
      "orderId": id,
      "status": status
    };

    this.orderService.changeOrderStatus(data)
    .subscribe(
      (res: any) => {
        if (res.success) {
          this.orderStatusSuccess = true;
          this.orderStatusError = false;
        }
        else {
          this.orderStatusSuccess = false;
          this.orderStatusError = true;
        }
      }, (error) => {
        this.orderStatusSuccess = false;
        this.orderStatusError = true;
      }
    );
  }
}
