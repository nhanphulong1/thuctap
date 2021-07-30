import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-capital',
  templateUrl: './add-capital.component.html',
  styleUrls: ['./add-capital.component.scss']
})
export class AddCapitalComponent implements OnInit {

  public formCapital = this.fb.group({
    name: ['',Validators.required],
    id: ['',Validators.required],
    percent: 0,
    propertyType: 'tiền mặt',
    value: ['',Validators.required]
  });

  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
