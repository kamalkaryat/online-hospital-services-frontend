import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Status } from 'src/app/models/Status';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';

@Component({
  selector: 'app-test-status-update-dialog',
  templateUrl: './test-status-update-dialog.component.html',
  styleUrls: ['./test-status-update-dialog.component.css']
})
export class TestStatusUpdateDialogComponent implements OnInit {
  form: FormGroup;
  statusList= this.makeTestStatusList();

  constructor(
      private fb: FormBuilder, 
      private haService: HospitalAdminService,
      @Inject(MAT_DIALOG_DATA) public testOrderData: any,  
      public dialogRef: MatDialogRef<TestStatusUpdateDialogComponent>, 
      private resMsg: DisplayResponseMessages) {
    
      this.form= this.fb.group({
      orderIdFC: [{value: '', disabled: true}],
      patientIdFC: [{value: '', disabled: true}],
      productFC: [{value: '', disabled: true}],
      productIdFC: [{value: '', disabled: true}],
      dateFC: [{value: '', disabled: true}],
      statusFC: ['', Validators.required],
      labIdFC: [{value: '', disabled: true}],
    })
  }

  ngOnInit(): void {
      if(this.testOrderData){
        this.form.controls['orderIdFC'].setValue(this.testOrderData.orderId);
        this.form.controls['patientIdFC'].setValue(this.testOrderData.patient.patientId);
        this.form.controls['productFC'].setValue(this.testOrderData.product.productName);
        this.form.controls['productIdFC'].setValue(this.testOrderData.product.productId);
        this.form.controls['dateFC'].setValue(this.testOrderData.orderDateTime);
        this.form.controls['statusFC'].setValue(this.testOrderData.status);        
        this.form.controls['labIdFC'].setValue(this.testOrderData.lab.labId);
      }
  }  

  onBtnClick(){
      if(this.form.valid){
          if(this.testOrderData){
            this.updateTestOrder();            
            this.dialogRef.close('productUpdated');
          }
          this.form.reset();
      }
      else
        this.resMsg.displaySnackBar('Some error exists in form');
  }

  private updateTestOrder(){
    const status= this.form.controls['statusFC'].value;
    const orderId= this.form.controls['orderIdFC'].value;

    this.haService.updateTestStatus(orderId, status).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Tets Order Updated');
          this.dialogRef.close('testOrderUpdated');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displaySnackBar('Test-Order Not Updated');
      }
    })
  }

  makeTestStatusList() : string[]{
    
    let list= [Status[Status.REQUEST_SUBMITTED], Status[Status.REQUEST_REJECTED], Status[Status.REQUEST_ACCEPTED], Status[Status.SAMPLE_COLLECTED], 
      Status[Status.SAMPLE_RECEIVED], Status[Status.RESULT_PENDING], Status[Status.TRANSFERED_TO_OTHER_LAB], 
      Status[Status.REPORT_UPLOADED]];

    let tmp= [Status.REQUEST_SUBMITTED, Status.REQUEST_REJECTED, Status.REQUEST_ACCEPTED, Status.SAMPLE_COLLECTED, 
      Status.SAMPLE_RECEIVED, Status.RESULT_PENDING, Status.TRANSFERED_TO_OTHER_LAB,Status.REPORT_UPLOADED];

    let filterdList: string[]= [];
    let i= 0;
    let currStatus= this.testOrderData.status;

    let flag= false;
    
    for(let ind=0; ind<list.length; ind++){
      if(currStatus === list[ind])
        i= ind;
    }

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      
      if(index > i)
        filterdList.push(list[index]); 
    }
    return filterdList;
  }
}
