import { Component, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormBuilder, FormControl, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit{

  formSignUp: FormGroup;

  constructor(private fb: FormBuilder) {
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
  
  nowDate = moment(new Date()).format('YYYY-MM-DD');
  
  onSubmit(){
    console.log(this.formSignUp.get('phone'));
  }

  matcher = new MyErrorStateMatcher();

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
