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
  date: string;
  person: string;
  phone: string;
  address: string;
  carrer: string;
  capital: number;
}

@Component({
  selector: 'app-statistics4',
  templateUrl: './statistics4.component.html',
  styleUrls: ['./statistics4.component.scss']
})
export class Statistics4Component implements OnInit {
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
  data_excel: BusinessHouseHoldElement[];
  dataSource;

  constructor(
    private fb: FormBuilder,
    private businessService: BussinessHouseholdService,
    private excelService: ExcelServiceService) { }

  ngOnInit(): void {
    this.formStatistics = this.fb.group({
      month: [-1, Validators.required],
      year: [-1],
      receptionPerson:[-1],
      position:[-1]
    });
  }

  ngAfterViewInit() {
    this.businessService.getBussinessHouse().subscribe((data: BusinessHouseHoldElement[])  => {
      this.households = data;
      console.log(this.households);
      this.count = data.length;
      // console.log(this.count);
      while (this.i < this.count-1 ) {
        // console.log(this.i);
        this.arr.push(this.i+1);
        this.i++;
      }
      // console.log(this.arr);
      this.business = [];
        this.j = 0;
        this.arr.forEach(element => {
          this.business[this.j] = this.households[element];
          this.j++;
        });
      this.business[this.j] = this.households[this.j];
      console.log(this.business);
      this.j = 0;
      this.k = 0;
      this.l = 0;
      let min = 0;
      let max = 0;
      this.year.push('Tất cả');
      this.persons.push('Tất cả');
      this.position.push('Tất cả');
      this.arr.forEach(element => {
        if((this.households[element]?.transactions[0]?.receptionPerson)!=(this.persons[this.j])){
          this.persons[this.j+1] = this.households[element]?.transactions[0]?.receptionPerson;
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
    });
  }

  public getData(){
    return {
      'month': this.formStatistics.value.month,
      'year': this.formStatistics.value.year,
      'receptionPerson': this.formStatistics.value.receptionPerson,
      'position': this.formStatistics.value.position
    }
  }

  onSearch(){
    if(!this.formStatistics.invalid){
      let data = this.getData();
      this.dataSource = new MatTableDataSource(this.households);
      this.dataSource.paginator = this.paginator;
      this.data_excel = this.households;
    }
  }


  exportExcel(){
    if(this.data_excel == null){
      // document.getElementById("err1").style.display = 'none';
      // document.getElementById("err2").style.display = 'block';
    }else{
      // document.getElementById("err2").style.display = 'none';
      this.excelService.exportAsExcelFile(this.data_excel, 'statistics');
    }
  }

}
