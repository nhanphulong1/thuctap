import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BussinessHouseholdService } from '../../Service/bussiness-household.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})

export class TransactionComponent implements OnInit {

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatSort, {static: false})

  public households;
  public id = '';

  constructor(
    private route: ActivatedRoute,
    private businessService: BussinessHouseholdService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    });

    this.businessService.getBussinessHouseById(this.id).subscribe(result => {
      this.households = result;
      this.loadTable();
    });
  }

  displayedColumns: string[] = ['position', 'name', 'number'];
  dataSource;
  data;

  public loadTable() {
    this.dataSource = new MatTableDataSource(this.households.transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public onClick(data) {
    this.router.navigate(['list/detail', this.id, data]);
    // console.log(data);
  }

  public onDelete(data) {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn muốn xóa giao dịch này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.households.transactions.splice(data, 1);
        if (this.households.transactions.length == 0) {
          this.businessService.deleteBussinessHouse(this.id).subscribe(result => {
            Swal.fire(
              'Deleted!',
              'Bạn đã xóa giao dịch thành công!',
              'success'
            );
            this.router.navigate(["/list/businesshousehold"]);
          }
          );
        } else {
          this.businessService.putBussinessHouse(this.households, this.id).subscribe(result => {
            Swal.fire(
              'Deleted!',
              'Bạn đã xóa giao dịch thành công!',
              'success'
            );
          })
        }
      }
    })
  }


}
