import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';
import Swal from 'sweetalert2';

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
    signer: ['',Validators.required],
    position: ['',Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private service: BussinessHouseholdService,
    private route: ActivatedRoute,
    private router: Router
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
    this.formCertificate.controls['signer'].setValue(this.data.transactions[this.index].signer);
    this.formCertificate.controls['position'].setValue(this.data.transactions[this.index].position);
    if(this.data?.transactions[this.index]?.businessCertificate){
      this.formCertificate.controls['level'].setValue(''+this.data.transactions[this.index].businessCertificate.level);
      this.formCertificate.controls['issuePlace'].setValue(this.data.transactions[this.index].businessCertificate.issuePlace);
      this.formCertificate.controls['career'].setValue(this.data.transactions[this.index].businessCertificate.career);
      this.formCertificate.controls['issueDate'].setValue(moment(this.data.transactions[this.index].businessCertificate.issueDate).format('YYYY-MM-DD'));
      this.formCertificate.controls['startDate'].setValue(moment(this.data.transactions[this.index].businessCertificate.startDate).format('YYYY-MM-DD'));
      this.formCertificate.controls['endDate'].setValue(moment(this.data.transactions[this.index].businessCertificate.endDate).format('YYYY-MM-DD'));
    }
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
    this.data.transactions[this.index].signer = this.formCertificate.value.signer;
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
        if(dt){
          // alert("cập nhật chứng nhận thành công!");
          // this.router.navigate(['list/businesshousehold']);
          Swal.fire(
            'Cập nhật thành công!',
            'Bạn đã cập nhật chứng chỉ hành nghề thành công!',
            'success'
          ).then( result =>{
            this.router.navigate(['list/detail/',this.id,this.index]);
          });
        }
      });
    }
  }
}
