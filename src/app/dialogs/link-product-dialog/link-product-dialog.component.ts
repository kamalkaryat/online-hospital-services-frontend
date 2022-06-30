import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from 'src/app/common/FilterOptions';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';
import { HospitalService } from 'src/app/services/hospital-service/hospital.service';
import { ProductStock} from 'src/app/models/ProductStock'
import { Hospital } from 'src/app/models/Hospital';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { Product } from 'src/app/models/Product';
@Component({
  selector: 'app-link-product-dialog',
  templateUrl: './link-product-dialog.component.html',
  styleUrls: ['./link-product-dialog.component.css']
})
export class LinkProductDialogComponent implements OnInit {
  form !: FormGroup;

  category: string[]= [];
  products: string[]= [];
  filteredOptions: string[] =[];

  constructor(
    private hospitalService: HospitalService,
    private fb: FormBuilder, private resMsg: DisplayResponseMessages,
    private haService: HospitalAdminService,
    private filterOptions: FilterOptions) { }

  ngOnInit(): void {
      const hId= this.haService.getHospital().hospitalId;
      this.form= this.fb.group({
          hospitalIdFC: [{value: hId, disabled: true}],
          productCostFC: [null, [Validators.required, Validators.min(0)]],
          productQuantityFC: [null, [Validators.required, Validators.min(1)]],
          productFC: [null, Validators.required],
          productCategoryFC: [null, Validators.required],
      })
  }

  linkProduct(){         
      this.haService.addOrUpdateStock(this.toProductQuantity()).subscribe({
          next: (res)=>{
              this.resMsg.displaySnackBar('Product Registered');
          },
          error: (err)=>{
              console.log(err);
              this.resMsg.displayErrorCategoryAndMessage('Registration Failed', err.message);
          }
      })
  }

   //make product-quantity dto
   private toProductQuantity(): ProductQuantity{
    
    let pq= new ProductQuantity();
    
    let product= new Product();
    product.productId= '';
    product.productName= this.form.controls['productFC'].value;
    product.productCategory= this.form.controls['productCategoryFC'].value;

    pq.product= product;

    pq.cost= this.form.controls['productCostFC'].value;
    pq.quantity= this.form.controls['productQuantityFC'].value;

    const hospital= new Hospital();
    hospital.hospitalId= this.form.controls['hospitalIdFC'].value;

    pq.hospital= hospital;
    console.log('linking: '+pq);
    
    return pq;
  }

  populateProductCategory(){
    let val= this.form.controls['productCategoryFC'].value;
    if(val === ''){
      this.products= [];
      this.form.controls['productFC'].setValue('');
    }
    if(this.category.length==0)  
        this.findCategory();

      this.form.controls['productCategoryFC'].valueChanges.subscribe(val=> {
          this.filteredOptions= this.filterOptions._filter(this.category, val);
      });
 }

 populateProducts(){
    if(this.products.length==0)
      this.findProducts(this.form.get('productCategoryFC')?.value);
    
    this.form.controls['productFC'].valueChanges.subscribe(val=> {
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
}
