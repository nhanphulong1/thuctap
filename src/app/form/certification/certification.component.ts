import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';
import { BusinessAgencyComponent } from '../business-agency/business-agency.component';
import { CapitalContributionComponent } from '../capital-contribution/capital-contribution.component';
import { CareerComponent } from '../career/career.component';
import { CateCareerComponent } from '../cate-career/cate-career.component';
import { RepresentativeComponent } from '../representative/representative.component';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {

  nowDate = moment(new Date()).format('YYYY-MM-DD');
  id='';
  index=0;
  data = null;

  public formCertificate = this.fb.group({
    type: [0,Validators.required],
    capital: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    capitalChar: ['',Validators.required],//Phải xử lý
    certificationNumber: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    name: ['',Validators.required],
    address: ['',Validators.required],
    phone: '',
    fax: '',
    email: '',
    website: '',
    notice: '',
    position: ['',Validators.required],
    signer: ['',Validators.required],
    issueDate: ['',Validators.required],
    issueUnit: ['',Validators.required],
    department: ['',Validators.required]
  });

  @ViewChild(RepresentativeComponent)
  repres: RepresentativeComponent;

  @ViewChild(CareerComponent)
  careers: CareerComponent;

  @ViewChild(CateCareerComponent)
  cateCareer: CateCareerComponent;

  @ViewChild(CapitalContributionComponent)
  capital: CapitalContributionComponent;

  @ViewChild(BusinessAgencyComponent)
  agency: BusinessAgencyComponent;

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
    if(this.index >= 0){
      this.service.getBussinessHouseById(this.id).subscribe((d)=>{
        this.data = d;
        // console.log(this.data);
        this.setValueCertificationForm();
      });
    }
  }

  public setValueCertificationForm(){
    this.formCertificate.controls['certificationNumber'].setValue(this.data.certificationNumber);
    this.formCertificate.controls['name'].setValue(this.data.name);
    this.formCertificate.controls['address'].setValue(this.data.address);
    this.formCertificate.controls['phone'].setValue(this.data.phoneNumber);
    this.formCertificate.controls['fax'].setValue(this.data.fax);
    this.formCertificate.controls['email'].setValue(this.data.email);
    this.formCertificate.controls['website'].setValue(this.data.website);
    this.formCertificate.controls['position'].setValue(this.data.transactions[this.index].position);
    this.formCertificate.controls['signer'].setValue(this.data.transactions[this.index].signer);
    this.formCertificate.controls['issueDate'].setValue(moment(this.data.createdDate).format('YYYY-MM-DD'));
    this.formCertificate.controls['issueUnit'].setValue(this.data.transactions[this.index].issueUnit);
    this.formCertificate.controls['department'].setValue(this.data.transactions[this.index].department);
    if(this.data.status != 0){
      this.formCertificate.controls['capital'].setValue(this.data.transactions[this.index].certification.businessCapital);
    }
    //điền dữ liệu vào người đại diện
    this.repres.setData(this.data);

    //điền dữ liệu vào ngành nghề
    if(this.data.transactions[this.index].certification?.listCareer){
      this.careers.setData(this.data.transactions[this.index].certification.listCareer);
    }

    //điền dữ liệu vào vốn kinh doanh
    if(this.data.transactions[this.index].certification?.capitalContribution){
      this.capital.setData(this.data.transactions[this.index].certification.capitalContribution);
    }

    //điền dữ liệu vào lĩnh vực kinh doanh
    if(this.data.transactions[this.index].certification?.categoryCareer){
      this.cateCareer.setData(this.data.transactions[this.index].certification.categoryCareer);
    }

    //điền dữ liệu vào chi nhánh
    if(this.data?.businessAgency){
      this.agency.setData(this.data.businessAgency);
    }
  }

  getData(){
    this.data.representative = {
      'phoneNumber':this.repres.formRepres.value.phoneNumber,
      'address':this.repres.formRepres.value.address,
      'name':this.repres.formRepres.value.name,
      'tax':this.repres.formRepres.value.tax,
      'email':this.repres.formRepres.value.email,
      'fax':this.repres.formRepres.value.fax,
      'website':this.repres.formRepres.value.website,
      'identityCard': {
        'id': this.repres.formRepres.value.cardId,
        'gender': this.repres.formRepres.value.gender,
        'birthday': this.repres.formRepres.value.birthday,
        'folk': this.repres.formRepres.value.folk,
        'national': this.repres.formRepres.value.national,
        'issueDate': this.repres.formRepres.value.issueDate,
        'issuePlace': this.repres.formRepres.value.issuePlace,
        'resident': this.repres.formRepres.value.resident
      }
    };
    this.data.transactions[this.index].certification = {
      'businessCapital': this.formCertificate.value.capital,
      'businessCapitalChar': this.formCertificate.value.capitalChar,
      'type': this.formCertificate.value.type,
      'notice': this.formCertificate.value.notice,
      'listCareer': this.careers.careers,
      'capitalContribution': this.capital.capital,
      'categoryCareer': this.cateCareer.cateCareer,
    };
    this.data.businessAgency = this.agency.agency;
    this.data.phoneNumber = this.formCertificate.value.phone;
    this.data.email = this.formCertificate.value.email;
    this.data.fax = this.formCertificate.value.fax;
    this.data.website = this.formCertificate.value.website;
    this.data.transactions[this.index].position = this.formCertificate.value.position;
    this.data.transactions[this.index].singer = this.formCertificate.value.singer;
    this.data.transactions[this.index].issueUnit = this.formCertificate.value.issueUnit;
    this.data.transactions[this.index].department = this.formCertificate.value.department;
  }

  public onSubmit(){
    this.repres.onCheck();
    if(this.repres.formRepres.valid && this.formCertificate.valid && this.careers.careers.length > 0){
      this.getData();
      console.log(this.data);
      this.service.putBussinessHouse(this.data,this.id);
    }
  };
}
