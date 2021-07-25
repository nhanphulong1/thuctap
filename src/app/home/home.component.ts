import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import * as moment from 'moment';
import { BussinessHouseholdService } from '../Service/bussiness-household.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit{

  formSignUp: FormGroup;

  nowDate = moment(new Date()).format('YYYY-MM-DD');

  constructor(
    private fb: FormBuilder,
    private businessService: BussinessHouseholdService,
  ) {
  }

  ngOnInit(): void {
    this.formSignUp = this.fb.group({
      receptDate: [this.nowDate, Validators.required],
      receptPerson:['', Validators.required],
      submitName:['', Validators.required],
      submitId:['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      phone:['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
      name:['', Validators.required],
      countWorker:null,
      address:['', Validators.required],
      ward:['', Validators.required],
      province:['', Validators.required]
    });
  }
  
  

  public getData(){
    return {
      'name': this.formSignUp.value.name,
      'address': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province,
      'certificationNumber':'00000001',
      'status': 0,
      'phoneNumber': this.formSignUp.value.phone,
      // 'email':'',
      // 'fax':'',
      // 'website':'',
      'countWorker': this.formSignUp.value.countWorker,
      'representative':{
        'name': this.formSignUp.value.submitName,
        'phoneNumber': this.formSignUp.value.phone,
        'address': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province,
        'email':'',
        'identityCard':{
          'id': this.formSignUp.value.submitId,
          'national': 'Việt Nam',
          'gender':0,
          'folk':'Kinh',
          'resident': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province
        }
      },
      'transactions':[{
        'name':'Thành lập mới',
        'status': 0,
        'receptionDate': this.formSignUp.value.receptDate,
        'receptionPerson': this.formSignUp.value.receptPerson,
        'submitPerson': this.formSignUp.value.submitName,
        'submitPhone': this.formSignUp.value.phone,
        'submitId': this.formSignUp.value.submitId
      }],
      'createdDate': this.nowDate,
      'updatedDate': this.nowDate
    };
  }
  
  public getData(){
    return {
      'name': this.formSignUp.value.name,
      'address': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province,
      'certificationNumber':'00000001',
      'status': 1,
      'phoneNumber': this.formSignUp.value.phone,
      // 'email':'',
      // 'fax':'',
      // 'website':'',
      'countWorker': this.formSignUp.value.countWorker,
      'representative':{
        'name': this.formSignUp.value.submitName,
        'phoneNumber': this.formSignUp.value.phone,
        'address': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province,
        'email':'',
        'identityCard':{
          'id': this.formSignUp.value.submitId,
          'national': 'Việt Nam',
          'gender':0,
          'folk':'Kinh',
          'resident': this.formSignUp.value.address+' - '+this.formSignUp.value.ward+' - '+this.formSignUp.value.province
        }
      },
      'transactions':[{
        'name':'Thành lập mới',
        'status': 0,
        'receptionDate': this.formSignUp.value.receptDate,
        'receptionPerson': this.formSignUp.value.receptPerson,
        'submitPerson': this.formSignUp.value.submitName,
        'submitPhone': this.formSignUp.value.phone,
        'submitId': this.formSignUp.value.submitId
      }],
      'createdDate': this.nowDate,
      'updatedDate': this.nowDate
    };
  }


  onSubmit(){
    if(!this.formSignUp.invalid){
      let data = this.getData();
      this.businessService.postBussinessHouse(data).subscribe((data) => {
        console.log(data);
        //Chuyển trang
      })
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
