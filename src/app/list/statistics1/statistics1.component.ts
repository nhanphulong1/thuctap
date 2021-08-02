import { Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ɵAnimationRendererFactory } from '@angular/platform-browser/animations';

import * as moment from 'moment';
import { element } from 'protractor';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';
import { ExcelServiceService } from '../../Service/excel/excel-service.service';

export interface BusinessHouseHoldElement {
  position: number;
  name: string;
  number: string;
  date: number;
  person: string;
  phone: string;
  address: string;
  carrer: string;
  capital: number;
}

@Component({
  selector: 'app-statistics1',
  templateUrl: './statistics1.component.html',
  styleUrls: ['./statistics1.component.scss']
})

export class Statistics1Component implements OnInit {
  @ViewChild('dataTable') dataTable: ElementRef;
  @ViewChild('error') errorDate: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
  formStatistics: FormGroup;
  nowDate = moment(new Date()).format('YYYY-MM-DD');
  
  public households;
  public count = 0;
  public arr = [];
  public i = 0;
  public j = 0;
  public k = 0;
  public business = [];
  public createdDate = [];
  public persons = [];
  public address = [];
  // address: string[] = ['Tất cả', 'Tiền Giang', 'TP HCM'];

  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  data_excel;
  dataSource;
  // signers;

  constructor(
    private fb: FormBuilder,
    private businessService: BussinessHouseholdService,
    private excelService: ExcelServiceService) {
   }

  ngOnInit(): void {
    this.formStatistics = this.fb.group({
      fromDate: ['', Validators.required],
      toDate: [this.nowDate],
      signer:[-1],
      address:[-1]
    });
  }

  ngAfterViewInit() {
    this.businessService.getStatus(0).subscribe((data)  => {
      this.households = data;
      console.log(this.households);
      this.count = data.length;
      // console.log(this.count);
      while (this.i < this.count) {
        // console.log(this.i);
        this.arr.push(this.i);
        this.i++;
      }
      // console.log(this.arr);
      // this.business = [];
      //   this.j = 0;
      //   this.arr.forEach(element => {
      //     this.business[this.j] = this.households[element];
      //     this.j++;
      //   });
      // console.log(this.business);
      this.j = 0;
      this.k = 0;
      this.persons.push('Tất cả');
      this.address.push('Tất cả');
      // this.signers = new MatTableDataSource(this.households);
      // console.log(this.signers);
      this.arr.forEach(element => {

        if((this.households[element]?.transactions[0]?.signer)!=(this.persons[this.j])){
          this.persons[this.j+1] = this.households[element]?.transactions[0]?.signer;
          this.j++;
        }

        if((this.households[element]?.address)!=(this.address[this.k])){
          this.address[this.k+1] = this.households[element]?.address;
          this.k++;
        }
      });

      this.persons = Array.from(new Set(this.persons));
      this.address = Array.from(new Set(this.address));
    });
  }

  public getData(){

    return {
      'fromDate': new Date(this.formStatistics.value.fromDate),
      'toDate': new Date(this.formStatistics.value.toDate),
      'signer': this.persons[this.formStatistics.value.signer+1],
      'address': this.address[this.formStatistics.value.address+1]
    }
  }

  onSearch(){
    if(!this.formStatistics.invalid){
      let data = this.getData();
      // console.log(data.toDate);
      // this.createdDate = [];
      this.business = [];
      this.dataSource = null;
      this.paginator.length = 0;
      this.data_excel = [];
      document.getElementById("err2").style.display = 'none';


      // this.j = 0;
      // this.arr.forEach(element => {
      //   this.createdDate[this.j] = new Date(this.households[element].createdDate);
      //   this.j++;
      // });

      // console.log(this.createdDate);
      

      this.j = 0;
      this.arr.forEach(element => {
        if (data.signer=='Tất cả'){
          if (data.address=='Tất cả'){
            if((data.fromDate<=new Date(this.households[element]?.createdDate))&&(data.toDate>=new Date(this.households[element]?.createdDate))){
              this.business[this.j] = this.households[element];
              this.j++;
            }
          }
          else{
            if((data.fromDate<=new Date(this.households[element]?.createdDate))&&(data.toDate>=new Date(this.households[element]?.createdDate))&&(data.address==this.households[element]?.address)){
              this.business[this.j] = this.households[element];
              this.j++;
            }
          }
        }
        else{
          if (data.address=='Tất cả'){
            if((data.fromDate<=new Date(this.households[element]?.createdDate))&&(data.toDate>=new Date(this.households[element]?.createdDate))&&(data.signer==this.households[element]?.transactions[0]?.signer)){
              this.business[this.j] = this.households[element];
              this.j++;
            }
          }
          else{
            if((data.fromDate<=new Date(this.households[element]?.createdDate))&&(data.toDate>=new Date(this.households[element]?.createdDate))&&(data.signer==this.households[element]?.transactions[0]?.signer)&&(data.address==this.households[element]?.address)){
              this.business[this.j] = this.households[element];
              this.j++;
            }
          }
        }

      });

      this.dataSource = new MatTableDataSource(this.business);
      this.dataSource.paginator = this.paginator;
      if (this.business.length == 0){
        this.data_excel = [];
      }else{
        // this.data_excel = this.business;
        this.j = 0;
        this.business.forEach(element => {
          this.data_excel[this.j] = {
            position: this.j+1,
            name: element?.name,
            number: element?.certificationNumber,
            date: new Date(element?.createdDate).getDate()+'/'+new Date(element?.createdDate).getMonth()+'/'+new Date(element?.createdDate).getFullYear(),
            person: element?.representative.name,
            phone: element?.phoneNumber,
            address: element?.address,
            carrer: element?.transactions[0]?.certification?.listCareer[0]?.name,
            capital: element?.transactions[0]?.certification?.businessCapital
          };
          // console.log(this.data_excel);
          // this.data_excel[this.j] = excel[element];
          this.j++;
        });
      }
      console.log(this.data_excel);

      // this.businessService.getStatistics1(data.fromDate, data.toDate, data.signer, data.address, 0).subscribe((data1)  => {
      //   // this.business = data1;
      //   console.log('TABLE', data1);
      //   if (data.address=='Tất cả'){
      //     // this.dataSource = new MatTableDataSource(this.households);
      //     // this.dataSource.paginator = this.paginator;
      //     // this.data_excel = this.households;
      //   }
      //   else{
      //     this.j = 0;
      //     this.arr.forEach(element => {
      //       if((data1[element]?.transactions[0]?.signer)==(data.signer)){
      //         this.business[this.j] = data1[element];
      //         this.j++;
      //       }
      //     });
          
      //     this.dataSource = new MatTableDataSource(this.business);
      //     this.dataSource.paginator = this.paginator;
      //     this.data_excel = this.business;
      //   }

      // });

      if (data.toDate.getFullYear() >= moment(new Date()).year()){
        // console.log(data.toDate.getFullYear());
        if (data.toDate.getMonth() >= moment(new Date()).month()){
          // console.log(data.toDate.getMonth());
          if (data.toDate.getDate() > moment(new Date()).date()){
            // console.log(data.toDate.getDate());
            if (data.fromDate.getDate() < moment(new Date()).date()){
              document.getElementById("err1").style.display = 'none';
            }
            // else{
            //   document.getElementById("err4").style.display = 'block';
            //   document.getElementById("err1").style.display = 'none';
            //   document.getElementById("err3").style.display = 'none';
            //   this.dataSource = null;
            //   this.paginator.length = 0;
            //   this.data_excel = null;
            //   return;
              // if (data.formDate.getDate() < data.toDate.getDate()){
              //   document.getElementById("err1").style.display = 'none';
              //   document.getElementById("err4").style.display = 'none';
              // }
              // else{
              //   document.getElementById("err1").style.display = 'none';
              //   // document.getElementById("err2").style.display = 'none';
              //   document.getElementById("err3").style.display = 'none';
              //   document.getElementById("err4").style.display = 'block';
              // }
            // }
            document.getElementById("err3").style.display = 'block';
            this.dataSource = null;
            this.paginator.length = 0;
            this.data_excel = [];
            return;
          }
          else {
            document.getElementById("err3").style.display = 'none';
          }
          // return;
        }
      }

      if (data.fromDate.getFullYear() >= data.toDate.getFullYear()){
        // console.log(data.formDate.getFullYear());
        if (data.fromDate.getMonth() >= data.toDate.getMonth()){
          // console.log(data.formDate.getMonth());
          if (data.fromDate.getDate() >= data.toDate.getDate()){
            // console.log(data.formDate.getDate());
            if(data.toDate.getDate() > moment(new Date()).date()){
              document.getElementById("err3").style.display = 'block';
            }
            document.getElementById("err1").style.display = 'block';
            return;
          }
          else{
            // console.log(this.business);
            document.getElementById("err1").style.display = 'none';
          }
        }
      }
      document.getElementById("err1").style.display = 'none';
    }
  }

  exportExcel(){
    if(this.data_excel.length == 0){
      document.getElementById("err1").style.display = 'none';
      document.getElementById("err2").style.display = 'block';
    }else{
      document.getElementById("err2").style.display = 'none';
      this.excelService.exportAsExcelFile(this.data_excel, 'statistics');
    }
  }

  matcher = new MyErrorStateMatcher();

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}