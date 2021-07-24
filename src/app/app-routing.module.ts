import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceiptComponent } from './form/receipt/receipt.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path:'receipt/:id/:index', component:ReceiptComponent},
  // { path: '', redirectTo:'home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
