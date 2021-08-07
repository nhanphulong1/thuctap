import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ParamMap, Router , ActivatedRoute} from '@angular/router';
// import { ParamMap, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';

@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss']
})
export class DelayComponent implements OnInit {
  nowDate = moment(new Date()).format('YYYY-MM-DD');

  formDelay: FormGroup;
  id='';
  index=0;
  data = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private businessService: BussinessHouseholdService,
    private route: ActivatedRoute,
    private service: BussinessHouseholdService,

  ) { }

  ngOnInit(): void {
    
    this.formDelay = this.fb.group({
      receptDate: [this.nowDate, Validators.required],
      receptPerson:['', Validators.required],
      submitPerson:['', Validators.required],
      submitId:['', [Validators.required, Validators.pattern("[0-9]{9}")]],
      submitPhone:['', [Validators.required, Validators.pattern("^[0][0-9]{9}")]],
      name:['', Validators.required], // ten ho kinh doanh
      // countWorker:null,
      // address:['', Validators.required],
      // ward:['', Validators.required],
      // province:['', Validators.required]
      certificationNumber: ['', Validators.required],// so chung nhan
      suspensionProfileID: ['', Validators.required],
      startDate: [this.nowDate, Validators.required],
      endDate: [this.nowDate, Validators.required],
      settlementDate: [this.nowDate, Validators.required],
      suspensionProfilecontent: [this.nowDate, Validators.required],

    })




    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
    });
    if(this.index >= 0){
      this.service.getBussinessHouseById(this.id).subscribe((d)=>{
        this.data = d;
        console.log(this.data);
        this.setValueReceiptForm();
      });
    }
  };
    
  public setValueReceiptForm(){
    this.formDelay.controls['name'].setValue(this.data.name);
    this.formDelay.controls['certificationNumber'].setValue(this.data.certificationNumber);
    this.formDelay.controls['receptPerson'].setValue(this.data.transactions[0].receptionPerson);

    console.log(this.data.name);
  };

  public getData(){
    let transactions = {
      'name' : 'tam ngung hoat dong ho kinh doanh',
      'status' : '0',
      'receptionDate' : this.formDelay.value.receptDate,
      'receptionPerson': this.formDelay.value.receptPerson,
      'submitPhone': this.formDelay.value.submitPhone,
      'submitPerson': this.formDelay.value.submitPerson,

      'submitId':this.formDelay.value.submitId,
      'suspensionProfile':{
        'id': this.formDelay.value.suspensionProfileID,
        'startDate' : this.formDelay.value.startDate,
        'endDate':this.formDelay.value.endDate,
        'content':this.formDelay.value.content, 
      }
    }
    
    // this.data.transactions[this.index].receptPerson = this.formDelay.value.receptPerson;
    // this.data.transactions[this.index].receptDate = this.formDelay.value.receptDate;
    // this.data.transactions[this.index].submitId = this.formDelay.value.submitId;
    // this.data.transactions[this.index].submitPhone = this.formDelay.value.submitPhone;
    // this.data.transactions[this.index].submitPhone = this.formDelay.value.name;
    // this.data.certificationNumber = this.formDelay.value.certificationNumber;
    // this.data.certificationNumber = this.formDelay.value.certificationNumber;
    // this.data.transactions[this.index].suspensionProfile.id = this.formDelay.value.suspensionProfileID;
    // this.data.transactions[this.index].suspensionProfile.startDate = this.formDelay.value.startDate;
    // this.data.transactions[this.index].suspensionProfile.endDate = this.formDelay.value.endDate;
    // this.data.transactions[this.index].suspensionProfile.content = this.formDelay.value.suspensionProfilecontent;
    this.data.transactions.push(transactions);
    this.data.status = 4;
    this.data.updatedDate = this.nowDate;

  }
  
  onSubmit(){
    if(!this.formDelay.invalid){
      let data = this.getData();
      this.businessService.putBussinessHouse(this.data,this.id).subscribe((data) => {
        console.log(data);
      })
      console.log(this.data);
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
