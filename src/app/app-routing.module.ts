import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { BuyerRequestComponent } from './buyer-request/buyer-request.component';
import { BidRequestComponent } from './bid-request/bid-request.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'search', component: SearchComponent },
  { path: 'bid-request/:id', component: BidRequestComponent },
  { path: 'buyer-request', component: BuyerRequestComponent },
  { path: 'user-services', component: UserServicesComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'user-profile/:id', component: ProfileComponent },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'create-job', component: CreateJobComponent },
  { path: 'order-page/:id/:userId', component: OrderPageComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
