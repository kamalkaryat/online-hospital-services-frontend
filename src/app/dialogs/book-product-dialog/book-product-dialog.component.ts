import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchaseProductRequest } from 'src/app/models/PurchaseProductRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-book-product-dialog',
  templateUrl: './book-product-dialog.component.html',
  styleUrls: ['./book-product-dialog.component.css']
})
export class BookProductDialogComponent implements OnInit {

  bookProductForm: FormGroup;

  constructor(private fb: FormBuilder, private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public productData: any,  
      public dialogRef: MatDialogRef<BookProductDialogComponent>, private resMsg: DisplayResponseMessages) { 
     
        this.bookProductForm= this.fb.group({
        id: [null],
        name: [null],
        category: [null],
        cost: [null],
        quantity: [null, [Validators.required, Validators.max(5),
            Validators.min(1)]],
        hospital: [null]
     })
  }

  ngOnInit(): void { 
      console.log(this.productData);
      
      if(this.productData){
          this.bookProductForm.controls['id'].setValue(this.productData.productId);
          this.bookProductForm.controls['cost'].setValue(this.productData.cost);
          this.bookProductForm.controls['name'].setValue(this.productData.productName);
          this.bookProductForm.controls['category'].setValue(this.productData.productCategory);
          this.bookProductForm.controls['hospital'].setValue(this.productData.hospital.hospitalName);
      }
  }

  //book product
  onBook(){
    if(this.bookProductForm.valid){
      let product = new PurchaseProductRequest();
      product.productId= this.productData.productId;
      product.cost= this.productData.cost;
      product.quantity= this.bookProductForm.controls['quantity'].value;
      product.hospitalName= this.productData.hospital.hospitalName;

      this.patientService.purchaseProduct(product).subscribe(
        (res: any) =>{
          console.log(res);
          
          this.resMsg.displaySnackBar('Product Booked Successfully');
          this.dialogRef.close('productBooked');
          this.bookProductForm.reset();
        },
        (err) =>{
          console.log('Error while booking products');
          this.dialogRef.close('productNotBooked');
          this.resMsg.displaySnackBar('Product Not Booked!');
      }
      );
    }
    else
      this.resMsg.displaySnackBar('Some fields are invalid')
  }
}
