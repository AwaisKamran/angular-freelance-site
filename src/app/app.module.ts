import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UserBadgeComponent } from './user-badge-component/user-badge.component';
import { UserMiniBadgeComponent } from './user-mini-badge-component/user-mini-badge.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    UserBadgeComponent,
    UserMiniBadgeComponent,
    DashboardComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
