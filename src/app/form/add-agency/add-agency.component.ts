import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-agency',
  templateUrl: './add-agency.component.html',
  styleUrls: ['./add-agency.component.scss']
})
export class AddAgencyComponent implements OnInit {
  public formAgency = this.fb.group({
    name: ['',Validators.required],
    address: ['',Validators.required],
    phoneNumber: ['',[Validators.required,Validators.pattern('[0-9]*')]]
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

}
