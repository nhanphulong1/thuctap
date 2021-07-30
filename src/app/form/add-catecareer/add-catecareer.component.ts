import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-catecareer',
  templateUrl: './add-catecareer.component.html',
  styleUrls: ['./add-catecareer.component.scss']
})
export class AddCatecareerComponent implements OnInit {
  
  public formcateCareer = this.fb.group({
    name: ['',Validators.required],
    id: ['',Validators.required],
  });

  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
  }

}
