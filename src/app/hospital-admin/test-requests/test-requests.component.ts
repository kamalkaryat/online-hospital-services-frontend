import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TestOrder } from 'src/app/models/TestOrder';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';
import { TestStatusUpdateDialogComponent } from '../test-status-update-dialog/test-status-update-dialog.component';

@Component({
  selector: 'app-test-requests',
  templateUrl: './test-requests.component.html',
  styleUrls: ['./test-requests.component.css']
})
export class TestRequestsComponent implements OnInit {



  //table header
  displayedColumns: string[] = ['orderId', 'patient.patientId','product.productName', 
  'product.productId','orderDateTime','status','lab.labId','actions'];
  
  //datasource
  dataSource!: MatTableDataSource<TestOrder>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private haService: HospitalAdminService, private dialog: MatDialog,
        private resMsg: DisplayResponseMessages,
        private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Test-Orders');
    this.getTestOrders();
  }
  
  //call hospital-admin-service to get test-orders
  public getTestOrders(){
    
    this.haService.findTestOrders().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding products');
              this.resMsg.displaySnackBar('Error while finding test requests!');
          }
        }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //edit prouduct event handler
  updateOrder(row: any): void {
    this.dialog.open(TestStatusUpdateDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{   
          this.getTestOrders();
    })
  }
}
