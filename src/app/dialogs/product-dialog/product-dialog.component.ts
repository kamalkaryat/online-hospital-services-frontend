import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/Product';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm: FormGroup;
  btnName= 'Save';

  constructor(private fb: FormBuilder, private adminService: AdminService,
      @Inject(MAT_DIALOG_DATA) public productData: any,  
      public dialogRef: MatDialogRef<ProductDialogComponent>,  private resMsg: DisplayResponseMessages) {
    
      this.productForm= this.fb.group({
      id: [null],
      name: [null, [Validators.required, Validators.maxLength(20)]],
      category: [null, [Validators.required, Validators.maxLength(20)]],
      description: [null, [Validators.required, Validators.maxLength(50)]]
    })
  }

  ngOnInit(): void {
      if(this.productData){
        this.btnName= 'Update';
        this.productForm.controls['id'].setValue(this.productData.productId);
        this.productForm.controls['name'].setValue(this.productData.productName);
        this.productForm.controls['category'].setValue(this.productData.productCategory);
        this.productForm.controls['description'].setValue(this.productData.productDesc);
      }
  }  

  onBtnClick(){
      if(this.productForm.valid){
          if(this.productData){
            this.updateProduct();            
            this.dialogRef.close('productUpdated');
          }
          else{
            this.saveProduct();
            this.dialogRef.close('productSaved');
          }
          
          this.productForm.reset();
      }
  }

  private saveProduct(){
    this.adminService.addProduct(this.toProduct()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Product Saved');
          this.dialogRef.close('productSaved');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displaySnackBar('Product Not Saved');
      }
    })
  }

  private updateProduct(){
    this.adminService.updateProduct(this.toProduct()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Product Updated');
          this.dialogRef.close('productUpdated');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displaySnackBar('Product Not Updated');
      }
    })
  }

  //make product dto
  private toProduct(): Product{
      let product= new Product();
      product.productId= this.productForm.controls['id'].value;
      product.productName= this.productForm.controls['name'].value;
      product.productCategory= this.productForm.controls['category'].value;
      product.productDesc= this.productForm.controls['description'].value;
      return product;
  }
}
