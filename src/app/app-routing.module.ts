import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessCertificateComponent } from './form/bussiness-certificate/bussiness-certificate.component';
import { ReceiptComponent } from './form/receipt/receipt.component';
import { HomeComponent } from './home/home.component';
import { BusinesshouseholdComponent } from './list/businesshousehold/businesshousehold.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path:'list/businesshousehold', component:BusinesshouseholdComponent},
  { path:'receipt/:id/:index', component:ReceiptComponent},
  { path:'certificate/:id/:index', component:BussinessCertificateComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
