import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-addcareer',
  templateUrl: './addcareer.component.html',
  styleUrls: ['./addcareer.component.scss']
})
export class AddcareerComponent implements OnInit {

  public formCareer = this.fb.group({
    name: ['',Validators.required],
    careerId: null,
    cateId: null
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    
  }
}
