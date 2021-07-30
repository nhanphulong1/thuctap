import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { AddAgencyComponent } from '../add-agency/add-agency.component';


export interface PeriodicElement {
  name: string;
  address: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-business-agency',
  templateUrl: './business-agency.component.html',
  styleUrls: ['./business-agency.component.scss']
})
export class BusinessAgencyComponent implements OnInit {
  agency: PeriodicElement[] = [];

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['position', 'name', 'address', 'phoneNumber'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.agency);

  openDialog(): void {
    let DialogRef = this.dialog.open(AddAgencyComponent);
    DialogRef.afterClosed().subscribe((result) =>{
      if(result != "false"){
        this.agency.push(result);
        this.dataSource.data = this.agency;
      }
      console.log(this.agency);
    });
  }

  public setData(data){
    this.agency=data;
    this.dataSource.data = this.agency;
  }
}
