import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { Area } from 'src/app/models/Area';
import { Hospital } from 'src/app/models/Hospital';
import { HospitalAdmin } from 'src/app/models/HospitalAdmin';
import { HospitalAdminSignupRequest } from 'src/app/models/HospitalAdminSignupRequest';
import { Password } from 'src/app/models/Password';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AdminService } from 'src/app/services/admin-service/admin.service';

@Component({
  selector: 'app-add-hospital-admin-dialog',
  templateUrl: './add-hospital-admin-dialog.component.html',
  styleUrls: ['./add-hospital-admin-dialog.component.css']
})
export class AddHospitalAdminDialogComponent implements OnInit {
  hospitalAdminForm !: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService, 
      public dialogRef: MatDialogRef<AddHospitalAdminDialogComponent>,
        private resMsg: DisplayResponseMessages) {
    
      this.hospitalAdminForm= fb.group({

        basicInfo: fb.group({
          usernameFC: [null, Validators.required],
          nameFC: [null, [Validators.required, Validators.minLength(5)]],
          dobFC: [null, Validators.required],
          genderFC: [null],
          phoneFC: [null, [Validators.required, Validators.minLength(10)]],
        }),

        hospitalInfo: this.fb.group({
          hospitalFC: [null, Validators.required],
          areaInfo: this.fb.group({
            stateFC: [null, Validators.required],
            districtFC: [null, Validators.required],
            pincodeFC: [null, Validators.required],
            areaNameFC: [null, Validators.required]
          })
        }),
        password: this.fb.group({
            pswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            cnfPswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
        })

    })
  }

  ngOnInit(): void {  }  

  onBtnClick(){
      if(this.hospitalAdminForm.valid){
          this.saveHospitalAdmin();
          this.hospitalAdminForm.reset();
      }
      else
          this.resMsg.displaySnackBar('Some fields are invalid!');
  }

  private saveHospitalAdmin(){
    this.adminService.addHospitalAdmin(this.toHospitalAdmin()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Hospital-Admin Registered');
          this.dialogRef.close('hospitalAdminSaved');
      },
      error:(err)=>{
          console.error(err.message);
          this.resMsg.displaySnackBar('Hospital-Admin Not Registered!');
          this.dialogRef.close('hospitalAdminNotSaved');
      }
    })
  }

  //create HospitalAdminSignupRequest model
  private toHospitalAdmin(): HospitalAdminSignupRequest{
    
      let hospitalAdminName= this.hospitalAdminForm.get('basicInfo.nameFC');
      let hospitalAdminPhoneNo= this.hospitalAdminForm.get('basicInfo.phoneFC');
      let hospitalAdminDob= this.hospitalAdminForm.get('basicInfo.dobFC');
      let hospitalAdminEmail= this.hospitalAdminForm.get('basicInfo.usernameFC');
      let hospitalAdminGender= this.hospitalAdminForm.get('basicInfo.genderFC');

      let hospitalName= this.hospitalAdminForm.get('hospitalInfo.hospitalFC'); 

      let area= new Area();
      let state= this.hospitalAdminForm.get('hospitalInfo.areaInfo.stateFC');
      let district= this.hospitalAdminForm.get('hospitalInfo.areaInfo.districtFC');
      let pincode= this.hospitalAdminForm.get('hospitalInfo.areaInfo.pincodeFC');
      let areaName= this.hospitalAdminForm.get('hospitalInfo.areaInfo.areaNameFC');

      area.state= state?.value;
      area.district= district?.value;
      area.pincode= pincode?.value;
      area.areaName= areaName?.value;

      let hospital= new Hospital();
      hospital.hospitalName= hospitalName?.value;
      hospital.area= area;

      let password= this.hospitalAdminForm.get('password.pswFC');
      let confirmPassword= this.hospitalAdminForm.get('password.cnfPswFC');

      let signupRequest= new HospitalAdminSignupRequest(hospitalAdminName?.value, hospitalAdminDob?.value,
        hospitalAdminGender?.value, hospitalAdminPhoneNo?.value, hospitalAdminEmail?.value,
        password?.value, confirmPassword?.value, true, hospital);
      console.log(signupRequest);
      
      return signupRequest;
  }
}
