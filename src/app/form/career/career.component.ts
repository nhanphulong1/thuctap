import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { AddcareerComponent } from '../addcareer/addcareer.component';

export interface PeriodicElement {
  name: string;
  careerId: number;
  cateId: string;
}



@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {
  careers: PeriodicElement[] = [];

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['position', 'name', 'careerId', 'cateId'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.careers);

  openDialog(): void {
    let DialogRef = this.dialog.open(AddcareerComponent);
    DialogRef.afterClosed().subscribe((result) =>{
      // console.log(result);
      if(result != "false"){
        if(result.careerId != null){
          result.careerId = +result.careerId;
        }
        this.careers.push(result);
        this.dataSource.data = this.careers;
        // this.changeDetectorRefs.detectChanges();
      }
      // console.log(careers);
    });
  }

  public setData(data){
    this.careers = data;
    this.dataSource.data = this.careers;
  }
}
