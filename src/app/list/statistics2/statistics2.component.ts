import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';
import { ExcelServiceService } from 'src/app/Service/excel/excel-service.service';
// import { MatMenuTrigger } from '@angular/material/menu';

export interface BusinessHouseHoldElement {
  position: number;
  name: string;
  number: string;
  date: number;
  capital: number;
  carrer: string;
  address: string;
  person: string;
  birtday: number;
  identityCard: number;
  issuePlace: string;
  issueDate: number;
}

@Component({
  selector: 'app-statistics2',
  templateUrl: './statistics2.component.html',
  styleUrls: ['./statistics2.component.scss']
})
export class Statistics2Component implements OnInit {
  // @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  formStatistics: FormGroup;
  nowDate = moment(new Date()).format('YYYY-MM-DD');
  month :string[] = ['Tất cả', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  public year = [];
  public persons = [];
  public position = [];

  public households;
  public count = 0;
  public arr = [];
  public i = 0;
  public j = 0;
  public k = 0;
  public l = 0;
  public business = [];

  displayedColumns: string[] = ['1', '2', '3', '4', '5', '6', '7', '0', '8', '9', '10', '11', '12'];
  data_excel = [];
  dataSource;

  constructor(
    private fb: FormBuilder,
    private businessService: BussinessHouseholdService,
    private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.formStatistics = this.fb.group({
      month: [-1, Validators.required],
      year: [-1],
      signer:[-1],
      position:[-1]
    });
  }

  ngAfterViewInit() {
    this.businessService.getBussinessHouse().subscribe((data: BusinessHouseHoldElement[])  => {
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
      // this.business[this.j] = this.households[this.j];
      // console.log(this.business);
      this.j = 0;
      this.k = 0;
      this.l = 0;
      let min = 0;
      let max = 0;
      this.year.push('Tất cả');
      this.persons.push('Tất cả');
      this.position.push('Tất cả');
      this.arr.forEach(element => {
        if((this.households[element]?.transactions[0]?.signer)!=(this.persons[this.j])){
          this.persons[this.j+1] = this.households[element]?.transactions[0]?.signer;
          this.j++;
        }
        if((this.households[element]?.transactions[0]?.position)!=(this.position[this.k])){
          this.position[this.k+1] = this.households[element]?.transactions[0]?.position;
          this.k++;
        }
        if((new Date(this.households[element]?.createdDate).getFullYear())!=(this.year[this.l])){
          this.year[this.l+1] = new Date(this.households[element]?.createdDate).getFullYear();
          this.l++;
        }
      });
      // console.log(this.year.sort);
      min = this.year[1];
      max = this.year[1];
      this.year.forEach(element => {
        if (min>element){
          min = element;
        }
        if (max<element){
          max = element;
        }
      });
      // console.log(min);
      // console.log(max);
      this.l = 0;
      this.i = 0;
      this.year = [];
      this.year.push('Tất cả');
      for(this.l=min;this.l<=max;this.l++){
          this.year[this.i+1] = this.l;
          this.i++;
      }

      this.persons = Array.from(new Set(this.persons));
      this.position = Array.from(new Set(this.position));
    });
  }

  public getData(){
    document.getElementById("err2").style.display = 'none';
    return {
      'month': this.month[this.formStatistics.value.month+1],
      'year': this.year[this.formStatistics.value.year+1],
      'signer': this.persons[this.formStatistics.value.signer+1],
      'position': this.position[this.formStatistics.value.position+1]
    }
  }

  onSearch(){
    if(!this.formStatistics.invalid){
      let data = this.getData();
      this.business = [];
      this.dataSource = null;
      this.paginator.length = 0;
      this.data_excel = [];
      
      // this.businessService.getStatistics2(data.month, data.year, data.signer, data.position, 0).subscribe((data1)  => {
      //   this.business = data1;
      //   console.log('TABLE', data1);
      //   this.dataSource = new MatTableDataSource(this.business);
      //   this.dataSource.paginator = this.paginator;
      //   this.data_excel = this.business;
      // });

      // console.log(data);
      this.j = 0;
      this.arr.forEach(element => {
        if (data.position=='Tất cả'){
          if (data.signer=='Tất cả'){
            if (data.year=='Tất cả'){
              if (data.month=='Tất cả'){
                //1111
                this.business[this.j] = this.households[element];
                this.j++;
              }
              else{
                //1110
                if (data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1)){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
            else{
              if (data.month=='Tất cả'){
                //1101
                if (data.year==new String(new Date(this.households[element]?.createdDate).getFullYear())){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //1100
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
          }
          else{
            if (data.year=='Tất cả'){
              if (data.month=='Tất cả'){
                //1011
                if (data.signer==new String(this.households[element]?.transactions[0]?.signer)){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //1010
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
            else{
              if (data.month=='Tất cả'){
                //1001
                if ((data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //1000
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
          }
        }
        else{
          if (data.signer=='Tất cả'){
            if (data.year=='Tất cả'){
              if (data.month=='Tất cả'){
                //0111
                if (data.position==new String(this.households[element]?.transactions[0]?.position)){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //0110
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
            else{
              if (data.month=='Tất cả'){
                //0101
                if ((data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //0100
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
          }
          else{
            if (data.year=='Tất cả'){
              if (data.month=='Tất cả'){
                //0011
                if ((data.signer==new String(this.households[element]?.transactions[0]?.signer))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //0010
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
            else{
              if (data.month=='Tất cả'){
                //0001
                if ((data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
              else{
                //0000
                if ((data.month==new String(new Date(this.households[element]?.createdDate).getMonth()+1))&&(data.year==new String(new Date(this.households[element]?.createdDate).getFullYear()))&&(data.signer==new String(this.households[element]?.transactions[0]?.signer))&&(data.position==new String(this.households[element]?.transactions[0]?.position))){
                  this.business[this.j] = this.households[element];
                  this.j++;
                }
              }
            }
          }
        }
      });
      // console.log(this.business);

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
            capital: element?.transactions[0]?.certification?.businessCapital,
            carrer: element?.transactions[0]?.certification?.listCareer[0]?.name,
            address: element?.address,
            person: element?.representative.name,
            birtday: new Date(element?.representative?.identityCard?.birthday).getDate()+'/'+new Date(element?.representative?.identityCard?.birthday).getMonth()+'/'+new Date(element?.representative?.identityCard?.birthday).getFullYear(),
            identityCard: element?.representative?.identityCard?.id,
            issuePlace: element?.representative?.identityCard?.issuePlace,
            issueDate: element?.representative?.identityCard?.issueDate
          };
          this.j++;
        });
      }
      console.log(this.data_excel);
    }
  }


  exportExcel(){
    if(this.data_excel.length == 0){
      // document.getElementById("err1").style.display = 'none';
      document.getElementById("err2").style.display = 'block';
    }else{
      document.getElementById("err2").style.display = 'none';
      this.excelService.exportAsExcelFile(this.data_excel, 'statistics');
    }
  }

}
