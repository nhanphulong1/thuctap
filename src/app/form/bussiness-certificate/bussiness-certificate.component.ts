import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';

@Component({
  selector: 'app-bussiness-certificate',
  templateUrl: './bussiness-certificate.component.html',
  styleUrls: ['./bussiness-certificate.component.scss']
})
export class BussinessCertificateComponent implements OnInit {

  nowDate = moment(new Date()).format('YYYY-MM-DD');
  id='';
  index=0;
  data = null;

  public formCertificate = this.fb.group({
    name: ['',Validators.required],
    birthday: ['',Validators.required],
    address: ['',Validators.required],
    level: ['',Validators.required],
    career: ['',Validators.required],
    identityId: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    identityDate: ['',Validators.required],
    national: ['Việt Nam',Validators.required],
    startDate: '',
    endDate: '',
    issuePlace: ['',Validators.required],
    issueDate: ['',Validators.required],
    singer: ['',Validators.required],
    position: ['',Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private service: BussinessHouseholdService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
      this.index = +params.get('index');
    });

    this.service.getBussinessHouseById(this.id).subscribe((dt)=>{
      this.data=dt;
      console.log(this.data);
      this.setValueCertificateForm();
    })
  }

  public setValueCertificateForm(){
    this.formCertificate.controls['name'].setValue(this.data.representative.name);
    this.formCertificate.controls['birthday'].setValue(moment(this.data.representative.identityCard.birthday).format('YYYY-MM-DD'));
    this.formCertificate.controls['address'].setValue(this.data.representative.address);
    this.formCertificate.controls['national'].setValue(this.data.representative.identityCard.national);
    this.formCertificate.controls['identityId'].setValue(this.data.representative.identityCard.id);
    this.formCertificate.controls['identityDate'].setValue(moment(this.data.representative.identityCard.issueDate).format('YYYY-MM-DD'));
  };

  public getValueCertificateForm(){
    this.data.transactions[this.index].businessCertificate = {
      'level': this.formCertificate.value.level,
      'career': this.formCertificate.value.career,
      'issuePlace': this.formCertificate.value.issuePlace,
      'issueDate': this.formCertificate.value.issueDate,
      'startDate': this.formCertificate.value.startDate,
      'endDate': this.formCertificate.value.endDate,
      'position': this.formCertificate.value.position
    };
    this.data.transactions[this.index].signer = this.formCertificate.value.singer;
    this.data.transactions[this.index].position = this.formCertificate.value.position;
    this.data.representative.name = this.formCertificate.value.name;
    this.data.representative.address = this.formCertificate.value.address;
    this.data.representative.identityCard.birthday = this.formCertificate.value.birthday;
    this.data.representative.identityCard.id = this.formCertificate.value.identityId;
    this.data.representative.identityCard.issueDate = this.formCertificate.value.identityDate;
    this.data.representative.identityCard.national = this.formCertificate.value.national;
  }


  public onSubmit(){
    if(this.formCertificate.valid){
      this.getValueCertificateForm();
      this.service.putBussinessHouse(this.data,this.id).subscribe((dt)=>{
        console.log(dt);
      });
    }
  }
}
