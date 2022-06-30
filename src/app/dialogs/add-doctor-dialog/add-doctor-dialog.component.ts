import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/models/Area';
import { DoctorSignupRequest } from 'src/app/models/DoctorSignupRequest';
import { Hospital } from 'src/app/models/Hospital';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';

@Component({
  selector: 'app-add-doctor-dialog',
  templateUrl: './add-doctor-dialog.component.html',
  styleUrls: ['./add-doctor-dialog.component.css']
})
export class AddDoctorDialogComponent implements OnInit {

  form !: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private resMsg: DisplayResponseMessages,
    private haService: HospitalAdminService) { }

  ngOnInit(): void {
      const hospital= this.haService.getHospital();

      this.form= this.fb.group({
          basicInfo: this.fb.group({
            usernameFC: [null, Validators.required],
            nameFC: [null, [Validators.required, Validators.minLength(4)]],
            dobFC: [null, Validators.required],
            genderFC: [null],
            phoneFC: [null, [Validators.required, Validators.minLength(10)]],
          }),
      
          docQualificationFC: [null, Validators.required],
          docDeptFC: [null, [Validators.required,Validators.max(20)]],

          hospitalInfo: this.fb.group({
            hospitalFC: [{value: hospital.hospitalName, disabled: true}],
            areaInfo: this.fb.group({
              stateFC: [{value: hospital.area.state, disabled: true}],
              districtFC: [{value: hospital.area.district, disabled: true}],
              pincodeFC: [{value: hospital.area.pincode, disabled: true}],
              areaNameFC: [{value: hospital.area.areaName, disabled: true}]
            })
          }),
          
          password: this.fb.group({
            pswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            cnfPswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
          })
      })
  }

  onButtonClick(){
    if(this.form.valid){
        this.saveDoctor();
        // this.form.reset();
    }
    else
        this.resMsg.displaySnackBar('Some fields are Invalid!');
  }

  private saveDoctor(){
    this.haService.addDoctor(this.toDoctorSignupRequest()).subscribe({
      next:(res)=>{
          this.resMsg.displaySnackBar('Doctor Registered');
      },
      error:(err)=>{
          console.log(err);
          this.resMsg.displayErrorCategoryAndMessage('Error', err.message);
      }
    })
  }

  //create HospitalAdminSignupRequest model
  private toDoctorSignupRequest(): DoctorSignupRequest{
    
      let name= this.form.get('basicInfo.nameFC');
      let phoneNo= this.form.get('basicInfo.phoneFC');
      let dob= this.form.get('basicInfo.dobFC');
      let email= this.form.get('basicInfo.usernameFC');
      let gender= this.form.get('basicInfo.genderFC');

      let department= this.form.get('docDeptFC');
      let qualification= this.form.get('docQualificationFC')

      let hospitalName= this.form.get('hospitalInfo.hospitalFC'); 
      let area= new Area();
      let state= this.form.get('hospitalInfo.areaInfo.stateFC');
      let district= this.form.get('hospitalInfo.areaInfo.districtFC');
      let pincode= this.form.get('hospitalInfo.areaInfo.pincodeFC');
      let areaName= this.form.get('hospitalInfo.areaInfo.areaNameFC');

      area.state= state?.value;
      area.district= district?.value;
      area.pincode= pincode?.value;
      area.areaName= areaName?.value;

      let hospital= new Hospital();
      hospital.hospitalName= hospitalName?.value;
      hospital.area= area;

      let password= this.form.get('password.pswFC');
      let confirmPassword= this.form.get('password.cnfPswFC');

      let signupRequest= new DoctorSignupRequest(name?.value, dob?.value,gender?.value, phoneNo?.value, 
        email?.value, password?.value, confirmPassword?.value, true, hospital, department?.value,
        qualification?.value);

      console.log(signupRequest);
      
      return signupRequest;
  }

}
