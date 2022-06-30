import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { TestOrderResponse } from 'src/app/models/TestOrderResponse';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  //table header
  displayedColumns: string[] = ['orderId', 'orderDateTime', 'labId','status','action'];

  //datasource
  dataSource!: MatTableDataSource<TestOrderResponse>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, private dialog: MatDialog, private title: Title) { }
  ngOnInit(): void {
    this.title.setTitle('Tests');
    this.getProducts();
  }
  
  //call hospital-service api to get test-orders
  public getProducts(){
    
    this.patientService.findTestHistory().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding test-orders');
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

  deleteProduct(orderId: string){
      alert('deleting order');
  }
}