import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { ProductDialogComponent } from 'src/app/dialogs/product-dialog/product-dialog.component';
import { Product } from 'src/app/models/Product';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';

@Component({
  selector: 'app-products-info',
  templateUrl: './products-info.component.html',
  styleUrls: ['./products-info.component.css']
})
export class ProductsInfoComponent implements OnInit {


  //table header
  displayedColumns: string[] = ['productId', 'productName', 'productCategory','productDesc','actions'];

  //datasource
  dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hospitalService: HospitalService, private dialog: MatDialog,
        private adminService: AdminService,
        private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Products');
    this.getProducts();
  }
  
  //call hospital-service api to get doctors
  public getProducts(){
    
    this.hospitalService.findProducts().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding products');
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

  //add product
  addProduct(){
    this.dialog.open(ProductDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'productSaved')
          this.getProducts();
    })
  }

  //edit prouduct event handler
  editProduct(row: any): void {
    this.dialog.open(ProductDialogComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{   
          this.getProducts();
    })
  }
}

