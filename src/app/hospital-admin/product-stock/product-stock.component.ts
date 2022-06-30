import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { ProductDialogComponent } from 'src/app/dialogs/product-dialog/product-dialog.component';
import { StockUpdateDialogComponent } from '../stock-update-dialog/stock-update-dialog.component';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css']
})
export class ProductStockComponent implements OnInit {

  
  //table header
  displayedColumns: string[] = ['product.productId', 'product.productName','cost','quantity','actions'];

  //datasource
  dataSource!: MatTableDataSource<ProductQuantity>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private haService: HospitalAdminService, private dialog: MatDialog,
    private resMsg: DisplayResponseMessages,private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Products');
    this.getProductsStock();
  }
  
  //call hospital-service api to get doctors
  public getProductsStock(){
    
    this.haService.findProductsStock().subscribe(
        {
          next: (res) =>{
            this.dataSource= new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding products');
              this.resMsg.displaySnackBar('Error while finding products stock!');
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
  updateStock(product: any): void {
    this.dialog.open(StockUpdateDialogComponent, {
      width: '30%',
      data: product
    }).afterClosed().subscribe(val=>{   
          this.getProductsStock();
    })
  }

  //delete stock
  deleteStock(row: any){
    const productId= row.product.productId;
    this.haService.unregisterProduct(productId).subscribe({
      next: (res) =>{
          this.resMsg.displaySnackBar('Product Removed');
          this.getProductsStock();
      },
      error: (err) =>{
          console.log('error while removing product');
          this.resMsg.displayErrorCategoryAndMessage('Product Not Removed', err.message);
      }
    })
  }
}

