import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserServicesComponent } from './user-services/user-services.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-services', component: UserServicesComponent },
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
