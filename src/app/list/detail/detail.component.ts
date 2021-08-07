import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { BussinessHouseholdService } from '../../Service/bussiness-household.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public households;
  public id = '';
  public index = 0;
  public arr= [];

  constructor(
    private route: ActivatedRoute,
    private businessService: BussinessHouseholdService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      this.id = params.get('id');
      this.index = +params.get('index');
    });

    this.businessService.getBussinessHouseById(this.id).subscribe( result  => {
      this.households = result;
      console.log(this.households);
      this.loadTable();
    });
  }

  displayedColumns: string[] = ['position', 'name', 'number'];
  dataSource;
  data;

  public loadTable(){
    //Kiểm tra có giấy biên nhận ko?
    if(this.households?.transactions[this.index]?.receipt){
      let data = {'name': 'Giấy biên nhận', 'string':'receipt'};
      this.arr.push(data);
    }

    //Kiểm tra có giấy chứng chỉ hành nghề ko?
    if(this.households?.transactions[this.index]?.businessCertificate){
      let data = {'name': 'Chứng chỉ hành nghề', 'string':'certificate'};
      this.arr.push(data);
    }

    //Kiểm tra có giấy chứng nhận ko?
    if(this.households?.transactions[this.index]?.certification){
      let data = {'name': 'Giấy chứng nhận', 'string':'certification'};
      this.arr.push(data);
    }

    //Có thể thêm kiểm tra khác
    if(this.households?.transactions[this.index]?.changeProfile){
      let data = {'name': 'Thay đổi thông tin hộ kinh doanh', 'string':'change'};
      this.arr.push(data);
    }

    if(this.households?.transactions[this.index]?.suspensionProfile){
      let data = {'name': 'Tạm ngưng hoạt động kinh doanh', 'string':'delay'};
      this.arr.push(data);
    }

    if(this.households?.transactions[this.index]?.recallProfile){
      let data = {'name': 'Thu hồi giấy phép kinh doanh', 'string':'recall'};
      this.arr.push(data);
    }

    if(this.households?.transactions[this.index]?.dissolutionProfile){
      let data = {'name': 'Giải thể hộ kinh doanh', 'string':'dissolution'};
      this.arr.push(data);
    }

    this.dataSource = new MatTableDataSource(this.arr);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onComplete(){
    this.households.transactions[this.index].status = 1;
    if(this.index==0){
      this.households.status = 1;
    }
    this.businessService.putBussinessHouse(this.households,this.id).subscribe( result => {
      Swal.fire(
        'Thành công!',
        'Bạn đã hoàn thành hồ sơ hộ kinh doanh!',
        'success'
      )
    })
  }

  public onClick(data){
    this.router.navigate([data,this.id,this.index]);
    console.log(data);
  }

  public onDelete(data){
    let bussiness = this.households;
    switch (data) {
      case 'receipt':
        bussiness.transactions[this.index].receipt = null;
        break;
      case 'certificate':
        bussiness.transactions[this.index].businessCertificate = null;
        break;
      case 'certification':
        bussiness.transactions[this.index].certification = null;
        break;
    
      default:
        break;
    }
    Swal.fire({
      title: 'Bạn chắc chắn?',
      text: "Bạn có muốn xóa giấy tờ này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.businessService.putBussinessHouse(bussiness,this.id).subscribe( kq =>{
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
          this.loadTable();
        })
      }
    })
  }


  
  public onDeleteTrans() {
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
        this.households.transactions.splice(this.index, 1);
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
            this.router.navigate(["/list/transaction",this.id]);
          })
        }
      }
    })
  }
}
