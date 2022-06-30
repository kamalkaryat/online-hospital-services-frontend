import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Hospital } from 'src/app/models/Hospital';
import { Product } from 'src/app/models/Product';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { ProductStock } from 'src/app/models/ProductStock';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';

@Component({
  selector: 'app-stock-update-dialog',
  templateUrl: './stock-update-dialog.component.html',
  styleUrls: ['./stock-update-dialog.component.css']
})
export class StockUpdateDialogComponent implements OnInit {

  productForm: FormGroup;

  constructor(
      private fb: FormBuilder, 
      private haService: HospitalAdminService,
      @Inject(MAT_DIALOG_DATA) public productData: any,  
      public dialogRef: MatDialogRef<StockUpdateDialogComponent>,  
      private resMsg: DisplayResponseMessages) {
    
      this.productForm= this.fb.group({
      idFC: [{value: '', disabled: true}],
      nameFC: [{value: '', disabled: true}],
      costFC: [null, [Validators.required, Validators.min(0)]],
      quantityFC: [null, [Validators.required, Validators.min(0)]]
    })
  }

  ngOnInit(): void {
      if(this.productData){
        this.productForm.controls['idFC'].setValue(this.productData.product.productId);
        this.productForm.controls['nameFC'].setValue(this.productData.product.productName);
        this.productForm.controls['costFC'].setValue(this.productData.cost);
        this.productForm.controls['quantityFC'].setValue(this.productData.quantity);
      }
  }  

  onBtnClick(){
      if(this.productForm.valid){
          if(this.productData){
            this.updateProduct();            
            this.dialogRef.close('productUpdated');
          }          
          this.productForm.reset();
      }
  }

  private updateProduct(){
    this.haService.addOrUpdateStock(this.toProductQuantity()).subscribe({
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

  //make product-quantity dto
  private toProductQuantity(): ProductQuantity{
      let pq= new ProductQuantity();
      
      let product= new Product();
      product.productId= this.productForm.controls['idFC'].value;
      product.productName= this.productForm.controls['nameFC'].value;
      product.productCategory= 'none';
      
      pq.product= product;
      pq.cost= this.productForm.controls['costFC'].value;
      pq.quantity= this.productForm.controls['quantityFC'].value;

      const hospital= new Hospital();
      hospital.hospitalId= this.haService.getHospitalAdminId();
      pq.hospital= hospital;
      return pq;
  }
}

