import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { BookProductDialogComponent } from 'src/app/dialogs/book-product-dialog/book-product-dialog.component';
import { ProductStock } from 'src/app/models/ProductStock';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { ProductStockConverter } from 'src/app/util/ProductStockConverter';

@Component({
  selector: 'app-find-products',
  templateUrl: './find-products.component.html',
  styleUrls: ['./find-products.component.css']
})
export class FindProductsComponent implements OnInit {

  category: string[]= [];
  products: string[]= [];
  filteredOptions: string[] =[];

  //table header
  displayedColumns: string[] = ['productId', 'productName', 'productCategory','hospital',
      'cost','quantity'];
  
  pc: ProductStockConverter= new ProductStockConverter();
  productStockForm: FormGroup;

  //datasource
  dataSource!: MatTableDataSource<ProductStock>;

  @ViewChild(MatPaginator)paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private hospitalService: HospitalService, 
    private dialog: MatDialog, private fb: FormBuilder, private resMsg: DisplayResponseMessages,
    private filterOptions: FilterOptions) {
    
      this.pc= new ProductStockConverter()
      this.productStockForm= this.fb.group({
        productCategoryFC: ['', Validators.required],
        productFC:['', Validators.required],
      })
   }

  ngOnInit(): void { }
  
  populateProductCategory(){
      let val= this.productStockForm.controls['productCategoryFC'].value;
      if(val === ''){
        this.products= [];
        this.productStockForm.controls['productFC'].setValue('');
      }
      if(this.category.length==0)  
          this.findCategory();

        this.productStockForm.controls['productCategoryFC'].valueChanges.subscribe(val=> {
            this.filteredOptions= this.filterOptions._filter(this.category, val);
        });
   }

   populateProducts(){
      if(this.products.length==0)
        this.findProducts(this.productStockForm.get('productCategoryFC')?.value);
      
      this.productStockForm.controls['productFC'].valueChanges.subscribe(val=> {
        this.filteredOptions= this.filterOptions._filter(this.products, val);
      });
   }

   findCategory(){
      this.hospitalService.findProductCategory().subscribe({
        next: (res)=>{
            this.category= res;
        },
        error: (err)=>{
          console.log('Error while finding product category');
          this.resMsg.displaySnackBar('Product Category Not Found');
        }
      })
   }

   findProducts(category: string){
    
    this.hospitalService.findProductsByCategory(category).subscribe({
      next: (res)=>{
          this.products= res;
      },
      error: (err)=>{
        console.log('Error while finding products');
        this.resMsg.displaySnackBar('Products Not Found');
      }
    })
   }
  
   //call hospital-service api to get stock
  public findStock(){    
    let product= this.productStockForm.controls['productFC'].value;
    let category= this.productStockForm.controls['productCategoryFC'].value;

    this.hospitalService.findProductStock(product, category).subscribe(
        {
          next: (res) =>{

            this.dataSource= new MatTableDataSource(this.pc.convert(res));
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error: (err) =>{
              console.log('Error while finding products');
              this.resMsg.displayErrorCategoryAndMessage('Error', 'Product Not Found');
          }
        }
    );
  }
  
  //filters used by the table table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

