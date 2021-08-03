import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { BussinessHouseholdService } from 'src/app/Service/bussiness-household.service';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  nowDate = moment(new Date()).format('YYYY-MM-DD');
  id='';
  index=0;
  data = null;

  public formReceipt = this.fb.group({
    receiptDate: ['',Validators.required],
    receiptNumber: ['',Validators.required],
    receiptPerson: ['',Validators.required],
    receiptType: '',
    profileNumber: ['',[Validators.required,Validators.pattern('[0-9]*')]],
    submitPerson: ['',Validators.required],
    attestNumber: '',
    address: '',
    phone: '',
    fax: '',
    email: '',
    website: '',
    titles: ['Giám đốc',Validators.required],
    content: ['',Validators.required],
    listProfile: ['',Validators.required],
    setlementDate: ['',Validators.required],
    issueUnit: ['',Validators.required],
    department: ['',Validators.required]
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
    if(this.index >= 0){
      this.service.getBussinessHouseById(this.id).subscribe((d)=>{
        this.data = d;
        console.log(this.data);
        this.setValueReceiptForm();
      });
    }
  };

  public setValueReceiptForm(){
    this.formReceipt.controls['receiptDate'].setValue( moment(this.data.transactions[this.index].receptionDate).format('YYYY-MM-DD'));
    this.formReceipt.controls['submitPerson'].setValue(this.data.transactions[this.index].submitPerson);
    this.formReceipt.controls['receiptPerson'].setValue(this.data.transactions[this.index].receptionPerson);
    this.formReceipt.controls['issueUnit'].setValue(this.data.transactions[this.index].issueUnit);
    this.formReceipt.controls['department'].setValue(this.data.transactions[this.index].department);
    this.formReceipt.controls['setlementDate'].setValue(this.nowDate);
    this.formReceipt.controls['address'].setValue(this.data.address);
    this.formReceipt.controls['phone'].setValue(this.data.phoneNumber);
    this.formReceipt.controls['fax'].setValue(this.data.fax);
    this.formReceipt.controls['email'].setValue(this.data.email);
    this.formReceipt.controls['website'].setValue(this.data.website);
    if(this.data?.transactions[this.index]?.receipt?.id){
      this.formReceipt.controls['receiptNumber'].setValue(this.data?.transactions[this.index]?.receipt?.id);
      this.formReceipt.controls['profileNumber'].setValue(this.data?.transactions[this.index]?.receipt?.profileNumber);
      this.formReceipt.controls['content'].setValue(this.data?.transactions[this.index]?.receipt?.content);
      this.formReceipt.controls['attestNumber'].setValue(this.data?.transactions[this.index]?.receipt?.attestNumber);
      this.formReceipt.controls['receiptType'].setValue(this.data?.transactions[this.index]?.receipt?.receiptType);
      let list = '';
      this.data?.transactions[this.index]?.receipt?.listProfile.forEach(element => {
        list = list + element +'\n';
      });
      this.formReceipt.controls['listProfile'].setValue(list.slice(0,list.length-1));
    }
  };

  public getValueReceiptForm(){
    let listProfiles = this.formReceipt.value.listProfile.split('\n');
    this.data.transactions[this.index].receipt= {
      'id': this.formReceipt.value.receiptNumber,
      'content': this.formReceipt.value.content,
      'listProfile': listProfiles,
      'attestNumber': this.formReceipt.value.attestNumber,
      'settlementDate': this.formReceipt.value.setlementDate,
      'profileNumber': this.formReceipt.value.profileNumber,
      'receiptType': this.formReceipt.value.receiptType
    };
    this.data.transactions[this.index].submitPerson = this.formReceipt.value.submitName;
    this.data.transactions[this.index].receiptDate = this.formReceipt.value.receiptDate;
    this.data.transactions[this.index].department = this.formReceipt.value.department;
    this.data.transactions[this.index].submitPerson = this.formReceipt.value.submitPerson;
    this.data.transactions[this.index].issueUnit = this.formReceipt.value.issueUnit;
    this.data.address = this.formReceipt.value.address;
    this.data.phoneNumber = this.formReceipt.value.phone;
    this.data.fax = this.formReceipt.value.fax;
    this.data.email = this.formReceipt.value.email;
    this.data.phone = this.formReceipt.value.phone;
    this.data.updatedDate = this.nowDate;
  }

  public onSubmit(){
    if(this.formReceipt.valid){
      this.getValueReceiptForm();
      this.service.putBussinessHouse(this.data,this.id).subscribe((dt)=>{
        if(dt){
          // alert("cập nhật biên nhận thành công!");
          // this.router.navigate(['list/businesshouse']);
          Swal.fire(
            'Cập nhật thành công!',
            'Bạn đã tạo giấy biên nhận thành công!',
            'success'
          ).then( result =>{
            this.router.navigate(['list/detail/',this.id,this.index]);
          });
        }
      });
    }
  };

}
