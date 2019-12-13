import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { BuyerRequestComponent } from './buyer-request/buyer-request.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'buyer-request', component: BuyerRequestComponent },
  { path: 'user-services', component: UserServicesComponent },
  { path: 'user-settings', component: UserSettingsComponent },
  { path: 'order-page/:id', component: OrderPageComponent },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
