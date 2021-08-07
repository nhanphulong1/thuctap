import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BussinessCertificateComponent } from './form/bussiness-certificate/bussiness-certificate.component';
import { CertificationComponent } from './form/certification/certification.component';
import { AddHousehouldComponent } from './form/add-househould/add-househould.component';
import { ReceiptComponent } from './form/receipt/receipt.component';
import { HomeComponent } from './home/home.component';
import { BusinesshouseholdComponent } from './list/businesshousehold/businesshousehold.component';
import { DetailComponent } from './list/detail/detail.component';
import { Statistics1Component } from './list/statistics1/statistics1.component';
import { Statistics2Component } from './list/statistics2/statistics2.component';
import { Statistics3Component } from './list/statistics3/statistics3.component';
import { Statistics4Component } from './list/statistics4/statistics4.component';
import { Statistics5Component } from './list/statistics5/statistics5.component';
import { Statistics6Component } from './list/statistics6/statistics6.component';
import { TransactionComponent } from './list/transaction/transaction.component';
import { DelayComponent } from './form/delay/delay.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path:'list/businesshousehold', component:BusinesshouseholdComponent},
  { path:'list/transaction/:id', component:TransactionComponent},
  { path:'add/:id', component:AddHousehouldComponent},
  { path:'delay/:id', component:DelayComponent},
  { path:'list/detail/:id/:index', component:DetailComponent},
  { path: '', redirectTo:'list/businesshousehold', pathMatch:'full'},
  { path:'receipt/:id/:index', component:ReceiptComponent},
  { path:'certificate/:id/:index', component:BussinessCertificateComponent},
  { path:'statistics/1', component:Statistics1Component},
  { path:'statistics/2', component:Statistics2Component},
  { path:'statistics/3', component:Statistics3Component},
  { path:'statistics/4', component:Statistics4Component},
  { path:'statistics/5', component:Statistics5Component},
  { path:'statistics/6', component:Statistics6Component},
  { path:'certification/:id/:index', component:CertificationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
