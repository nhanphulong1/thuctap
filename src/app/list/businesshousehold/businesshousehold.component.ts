import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BussinessHouseholdService } from '../../Service/bussiness-household.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

export interface BusinessHouseHoldElement {
  position: number;
  name: string;
  number: string;
  date: string;
  address: string;
  status: string;

  // _id: Object;
  // name: string;
  // address: string;
  // certificationNumber: string;
  // status: number;
  // phoneNumber: string;
  // email: string;
  // fax: string;
  // website: string;
  // countWorker: number;
  // representative:{
  //   name: string;
  //   phoneNumber: number;
  //   address: string;
  //   email: string;
  //   identityCard: {
  //     id: number;
  //     national: string;
  //     gender: number;
  //     folk: string;
  //     resident: string;
  //   }
  // };
  // transactions:[{
  //   name: string;
  //   status: number;
  //   receptionDate: Date;
  //   receptionPerson: string;
  //   submitPerson: string;
  //   submitPhone: string;
  //   submitId: string;
  //   }];
  // deloymentId: Object;
  // createdDate: Date;
  // updatedDate: Date;
}

// const ELEMENT_DATA: BusinessHouseHoldElement[] = [
//   {position: 1, name: 'PHONG PHÚ 1', number: '00000123', date: '15/06/2021', address: '3/2 Thành phố Cần Thơ', status: 'Dự thảo'},
// ];

@Component({
  selector: 'app-businesshousehold',
  templateUrl: './businesshousehold.component.html',
  styleUrls: ['./businesshousehold.component.scss']
})
export class BusinesshouseholdComponent implements AfterViewInit {
  formListHouse: FormGroup;
  
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort, {static: false})

  public households;
  public count = 0;
  public arr = [];
  public i = 0;
  public j = 0;
  public business = [];

  public position;
  public name;
  public number;
  public date;
  public address;
  public status;

  radioChoice: string;
  choices: string[] = ['Tất cả', 'Chờ xử lý', 'Đang hoạt động'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private businessService: BussinessHouseholdService,
  ) { }

  // ngOnInit(): void {
  //   this.businessService.getBussinessHouse().subscribe((data => {
  //     console.log(data);
  //     this.households = data;
  //   }));
  // }

  ngOnInit(): void {
    this.formListHouse = this.fb.group({
      // radioChoice: ['', Validators.required],
      name:['', Validators.required],
      certificationNumber:['', Validators.required],
      createdDate:['', Validators.required],
      status:['-1', Validators.required]
    });
  }

  displayedColumns: string[] = ['position', 'name', 'number', 'date', 'address', 'status', 'manipulation'];
  dataSource;
  data;

  // set sort(value: MatSort) {
  //   this.dataSource.sort = value;
  // }

  ngAfterViewInit() {
    this.businessService.getBussinessHouse().subscribe((data: BusinessHouseHoldElement[])  => {
      this.households = data;
      console.log(this.households);
      this.count = data.length;
      while (this.i < this.count) {
        // console.log(this.i);
        this.arr.push(this.i);
        this.i++;
      }
      this.dataSource = new MatTableDataSource(this.households);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.arr);
      // console.log(this.count)
      // this.dataSource = new MatTableDataSource(data);
      // this.dataSource.paginator = this.paginator;
      // // console.log(this.dataSource.paginator)
      // this.dataSource.sort = this.sort;
      // // console.log(this.dataSource.sort)
    });
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  // public j = 0;
  // for ( j ; j <= this.count; j++){
  //   document.write(j);
  // }

  clickChoice(i: number) {
      if(i==0){
        this.business = [];
        this.j = 0;
        this.arr.forEach(element => {
          if(this.households[element].status==0){
            this.business[this.j] = this.households[element];
            this.j++;
          }
        });
      }
      else if(i==1){
        this.business = [];
        this.j = 0;
        this.arr.forEach(element => {
          if(this.households[element].status==1){
            this.business[this.j] = this.households[element];
            this.j++;
          }
        });
      }
      else{
        this.business = this.households;
      }
      this.dataSource = new MatTableDataSource(this.business);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }
  

  public getData(){
    return {
      // 'status': this.formListHouse.value.radioChoice,
      'name': this.formListHouse.value.name,
      'certificationNumber': this.formListHouse.value.certificationNumber,
      'createdDate': new Date(this.formListHouse.value.createdDate),
      'status': this.formListHouse.value.status
    }
  }

  onSearch(){
    // this.route.paramMap.subscribe((params: ParamMap)=>{
    //   this.data = params.get('name');
    // });
    if(!this.formListHouse.invalid){
      let data = this.getData();
      
      if(data.status==-1){
        this.businessService.getForms(data.name, data.certificationNumber, data.createdDate).subscribe((dataGet) => {
          console.log('Tất cả',dataGet);
          this.dataSource = new MatTableDataSource(dataGet);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
      else{
        this.businessService.getForm(data.name, data.certificationNumber, data.createdDate, data.status).subscribe((dataGet) => {
          console.log(dataGet);
          this.dataSource = new MatTableDataSource(dataGet);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
      
      
      
      
      
      // console.log(data);
      // var b1 = [];
      // var b2 = [];
      // var b3 = [];
      // var b4 = [];

      // this.businessService.getNameBusinessHouseholds(data.name).subscribe((data1) => {
      //   // console.log(data1);
      //   // b1 = data1;
      //   this.dataSource = new MatTableDataSource(data1);
      //   this.dataSource.paginator = this.paginator;
      //   this.dataSource.sort = this.sort;
      // })

      // this.businessService.getCertificationNumber(data.certificationNumber).subscribe((data2) => {
      //   // console.log(data2);
      //   b2 = data2;
      // })

      // this.businessService.getStatus(data.status).subscribe((data4) => {
      //   console.log(data4);
      //   b4 = data4;
      // })
      //Lọc bảng
      // console.log('b1', b1);
      // this.dataSource = new MatTableDataSource(b1);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;

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
