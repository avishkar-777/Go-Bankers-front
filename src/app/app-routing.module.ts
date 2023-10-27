import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';

const routes: Routes = [
  {path: '', component: DashboardComponent},
  {path:'user', component: UsersComponent},
  {path:'task', component:TaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
