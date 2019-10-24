import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponentComponent },
  { path: 'dashboard', component: DashboardComponent },
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
