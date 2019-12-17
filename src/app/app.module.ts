import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserMiniBadgeComponent } from './user-mini-badge/user-mini-badge.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';

import { CategoryService } from './services/category.service';
import { ServicesService } from './services/services.service';
import { SubCategoryService } from './services/sub-category.service';
import { UserService } from './services/user.service';
import { RegisterComponent } from './register/register.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserServiceBadgeComponent } from './user-service-badge/user-service-badge.component';
import { UserInfoBadgeComponent } from './user-info-badge/user-info-badge.component';
import { UserOrderBadgeComponent } from './user-order-badge/user-order-badge.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { BuyerRequestComponent } from './buyer-request/buyer-request.component';
import { BidRequestComponent } from './bid-request/bid-request.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { SearchComponent } from './search/search.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserMiniBadgeComponent,
    DashboardComponent,
    UserServicesComponent,
    RegisterComponent,
    UserSettingsComponent,
    UserServiceBadgeComponent,
    UserInfoBadgeComponent,
    UserOrderBadgeComponent,
    OrderPageComponent,
    CommentListComponent,
    BuyerRequestComponent,
    BidRequestComponent,
    CreateJobComponent,
    SearchComponent,
    AdminViewComponent,
    RatingComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    CategoryService,
    ServicesService,
    SubCategoryService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
