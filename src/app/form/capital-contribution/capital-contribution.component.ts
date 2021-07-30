import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { AddCapitalComponent } from '../add-capital/add-capital.component';


export interface PeriodicElement {
  id: string;
  name: string;
  percent: number;
  value: number;
  propertyType: string;
}

@Component({
  selector: 'app-capital-contribution',
  templateUrl: './capital-contribution.component.html',
  styleUrls: ['./capital-contribution.component.scss']
})
export class CapitalContributionComponent implements OnInit {
  capital: PeriodicElement[] = [];

  constructor(
    public dialog: MatDialog,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['position', 'name', 'id', 'value', 'percent', 'propertyType'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.capital);

  openDialog(): void {
    let DialogRef = this.dialog.open(AddCapitalComponent);
    DialogRef.afterClosed().subscribe((result) =>{
      if(result != "false"){
        this.capital.push(result);
        this.setPercent();
        this.dataSource.data = this.capital;
      }
      console.log(this.capital);
    });
  }

  setPercent(){
    let sum = this.sumCapital();
    for(let index in this.capital){
      this.capital[index].percent = Math.round(this.capital[index].value/sum*10000)/100;
    }
  }

  sumCapital(){
    let sum = 0;
    for(let val of this.capital){
      sum = sum + val.value;
    }
    return sum;
  }

  public setData(data){
    this.capital = data;
    this.setPercent();
    this.dataSource.data = this.capital;
  }
}
