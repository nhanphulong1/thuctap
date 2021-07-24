import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BusinesshouseholdComponent } from './list/businesshousehold/businesshousehold.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path:'list/businesshousehold', component:BusinesshouseholdComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
