import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExcelServiceService } from './Service/excel/excel-service.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AddHousehouldComponent } from './form/add-househould/add-househould.component';
import { BusinesshouseholdComponent } from './list/businesshousehold/businesshousehold.component';
import { ReceiptComponent } from './form/receipt/receipt.component';
import { BussinessCertificateComponent } from './form/bussiness-certificate/bussiness-certificate.component';
import { Statistics1Component } from './list/statistics1/statistics1.component';
import { Statistics2Component } from './list/statistics2/statistics2.component';
import { Statistics3Component } from './list/statistics3/statistics3.component';
import { Statistics4Component } from './list/statistics4/statistics4.component';
import { Statistics5Component } from './list/statistics5/statistics5.component';
import { Statistics6Component } from './list/statistics6/statistics6.component';
import { CertificationComponent } from './form/certification/certification.component';
import { RepresentativeComponent } from './form/representative/representative.component';
import { CareerComponent } from './form/career/career.component';
import { AddcareerComponent } from './form/addcareer/addcareer.component';
import { CapitalContributionComponent } from './form/capital-contribution/capital-contribution.component';
import { AddCapitalComponent } from './form/add-capital/add-capital.component';
import { CateCareerComponent } from './form/cate-career/cate-career.component';
import { AddCatecareerComponent } from './form/add-catecareer/add-catecareer.component';
import { AddAgencyComponent } from './form/add-agency/add-agency.component';
import { BusinessAgencyComponent } from './form/business-agency/business-agency.component';
import { TransactionComponent } from './list/transaction/transaction.component';
import { DetailComponent } from './list/detail/detail.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AddHousehouldComponent,
    BusinesshouseholdComponent,
    ReceiptComponent,
    BussinessCertificateComponent,
    Statistics1Component,
    Statistics2Component,
    Statistics3Component,
    Statistics4Component,
    Statistics5Component,
    Statistics6Component,
    CertificationComponent,
    RepresentativeComponent,
    CareerComponent,
    AddcareerComponent,
    CapitalContributionComponent,
    AddCapitalComponent,
    CateCareerComponent,
    AddCatecareerComponent,
    AddAgencyComponent,
    BusinessAgencyComponent,
    TransactionComponent,
    DetailComponent,
  ],
  entryComponents: [AddcareerComponent, AddCapitalComponent, AddCatecareerComponent, AddAgencyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule
  ],
  providers: [ExcelServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
