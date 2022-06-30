import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ProductPurchased } from 'src/app/models/ProductPurchased';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-purchased-products',
  templateUrl: './purchased-products.component.html',
  styleUrls: ['./purchased-products.component.css']
})
export class PurchasedProductsComponent implements OnInit {


  //table header
  displayedColumns: string[] = ['txnId','product', 'quantity', 'totalCost', 'purchaseDateTime'];

  //datasource
  dataSource!: MatTableDataSource<ProductPurchased>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, private dialog: MatDialog,
    private resMsg: DisplayResponseMessages, private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Booked-Products');
    this.getProducts();
  }
  
  //call hospital-service api to get doctors
  public getProducts(){
    
    this.patientService.findAllPurchasedProducts().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            
          },
          error: (err) =>{
              console.log('Error while finding purchased products');
              this.resMsg.displaySnackBar('Error while finding purchased products!');
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
  editProduct(row: any): void {
      alert('editing')
  }

  //delete prouduct event handler
  deleteProduct(productId: string){
    alert('deleting a product');
    console.log(productId);
    //TODO : CALL API

    //after delete operation
    this.getProducts();
  }
}

