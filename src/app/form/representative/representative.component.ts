import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';

@Component({
  selector: 'app-representative',
  templateUrl: './representative.component.html',
  styleUrls: ['./representative.component.scss']
})
export class RepresentativeComponent implements OnInit {

  public formRepres = this.fb.group({
    name: ['',Validators.required],
    cardId: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    gender: ['',Validators.required],
    issueDate: ['',Validators.required],
    issuePlace: ['',Validators.required],
    birthday: ['',Validators.required],
    folk: ['Kinh',Validators.required],
    national: ['Việt Nam',Validators.required],
    resident: ['',Validators.required],
    address: ['',Validators.required],
    phoneNumber: '',
    fax: '',
    email: '',
    website: '',
    tax: ''
  });

  constructor(
    private fb: FormBuilder,
    private service: BussinessHouseholdService
  ) { }

  ngOnInit(): void {
  }

  public setData(data){
    this.formRepres.controls['name'].setValue(data.representative.name);
    this.formRepres.controls['address'].setValue(data.representative.address);
    this.formRepres.controls['phoneNumber'].setValue(data.representative.phoneNumber);
    this.formRepres.controls['fax'].setValue(data.representative.fax);
    this.formRepres.controls['email'].setValue(data.representative.email);
    this.formRepres.controls['website'].setValue(data.representative.website);
    this.formRepres.controls['tax'].setValue(data.representative.tax);
    this.formRepres.controls['cardId'].setValue(data.representative.identityCard.id);
    this.formRepres.controls['gender'].setValue(data.representative.identityCard.gender);
    this.formRepres.controls['folk'].setValue(data.representative.identityCard.folk);
    this.formRepres.controls['national'].setValue(data.representative.identityCard.national);
    this.formRepres.controls['issuePlace'].setValue(data.representative.identityCard.issuePlace);
    this.formRepres.controls['issueDate'].setValue(moment(data.representative.identityCard.issueDate).format('YYYY-MM-DD'));
    this.formRepres.controls['birthday'].setValue(moment(data.representative.identityCard.birthday).format('YYYY-MM-DD'));
    this.formRepres.controls['resident'].setValue(data.representative.identityCard.resident);
  }

  public onCheck(){
    for(let i in this.formRepres.controls)
    this.formRepres.controls[i].markAllAsTouched();
    // console.log("gender: "+ (this.formRepres.value.gender == 0));
  }

}
