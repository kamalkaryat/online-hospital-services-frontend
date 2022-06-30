import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-add-hospital-dialog',
  templateUrl: './add-hospital-dialog.component.html',
  styleUrls: ['./add-hospital-dialog.component.css']
})
export class AddHospitalDialogComponent implements OnInit {


  hospitalForm !: FormGroup;
  btnName= 'Save';

  constructor(private fb: FormBuilder, private adminService: AdminService,
      @Inject(MAT_DIALOG_DATA) public hospitalData: any,  
      public dialogRef: MatDialogRef<AddHospitalDialogComponent>,  private resMsg: DisplayResponseMessages) {
    
      
  }

  ngOnInit(): void { 
    this.hospitalForm= this.fb.group({

      businessBasicInfo: this.fb.group({
        typeFC: [null, [Validators.required, Validators.maxLength(20)]],
        phoneFC: [null, [Validators.required, Validators.maxLength(10)]],
        emailFC: [null, [Validators.maxLength(40)]],
      }),

      hospitalInfo: this.fb.group({
        hospitalFC: [null, Validators.required],
        areaInfo: this.fb.group({
          stateFC: [null, Validators.required],
          districtFC: [null, Validators.required],
          pincodeFC: [null, Validators.required],
          areaNameFC: [null, Validators.required]
        })
      })

    })
  }  

  onBtnClick(){
      if(this.hospitalForm.valid){
          this.saveHospital();
          this.hospitalForm.reset();
      }
      else
          this.resMsg.displaySnackBar('Some fields are invalid!');
  }

  private saveHospital(){
    this.adminService.addHospital(this.toHospital()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Hospital Registered');
          this.dialogRef.close('hospitalSaved');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displaySnackBar('Hospital Not Registered!');
          this.dialogRef.close('hospitalNotSaved');
      }
    })
  }

  //make hospital dto
  private toHospital(): Hospital{
      let hospital= new Hospital();
      
      let hospitalPhoneNo= this.hospitalForm.get('businessBasicInfo.phoneFC');
      let hospitalEmail= this.hospitalForm.get('businessBasicInfo.emailFC');
      let hospitalType= this.hospitalForm.get('businessBasicInfo.typeFC');
      
      let hospitalName= this.hospitalForm.get('hospitalInfo.hospitalFC'); 

      let area= new Area();
      let state= this.hospitalForm.get('hospitalInfo.areaInfo.stateFC');
      let district= this.hospitalForm.get('hospitalInfo.areaInfo.districtFC');;
      let pincode= this.hospitalForm.get('hospitalInfo.areaInfo.pincodeFC');;
      let areaName= this.hospitalForm.get('hospitalInfo.areaInfo.areaNameFC');;
      
      hospital.hospitalName= hospitalName?.value;
      hospital.hospitalPhoneNo= hospitalPhoneNo?.value;
      hospital.hospitalType= hospitalType?.value;
      hospital.hospitalEmail= hospitalEmail?.value;
      hospital.area= area;
      
      area.state= state?.value;
      area.district= district?.value;
      area.pincode= pincode?.value;
      area.areaName= areaName?.value;

      hospital.area= area;
      hospital.hospitalStatus= true;
      
      console.log(hospital);
      
      return hospital;
  }
}
