import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { UserBadgeComponent } from './user-badge/user-badge.component';
import { UserBadgeComponentComponent } from './user-badge-component/user-badge-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    UserBadgeComponent,
    UserBadgeComponentComponent
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
