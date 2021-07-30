import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { AddCatecareerComponent } from '../add-catecareer/add-catecareer.component';

export interface PeriodicElement {
  id: number;
  name: string;
}


@Component({
  selector: 'app-cate-career',
  templateUrl: './cate-career.component.html',
  styleUrls: ['./cate-career.component.scss']
})
export class CateCareerComponent implements OnInit {
  cateCareer: PeriodicElement[] = [];

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['position', 'name', 'id'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.cateCareer);

  openDialog(): void {
    let DialogRef = this.dialog.open(AddCatecareerComponent);
    DialogRef.afterClosed().subscribe((result) =>{
      if(result != "false"){
        this.cateCareer.push(result);
        this.dataSource.data = this.cateCareer;
      }
      // console.log(this.cateCareer);
    });
  }

  public setData(data){
    this.cateCareer = data;
    this.dataSource.data = this.cateCareer;
  }

}
