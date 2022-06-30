import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Patient } from 'src/app/models/Patient';
import { ProfileUpdateRequest } from 'src/app/models/ProfileUpdateRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  
  patient= new Patient();

  constructor(private patientService: PatientService, private fb: FormBuilder, 
    private resMsg: DisplayResponseMessages, private router: Router, private title: Title) { 
        this.form= fb.group({
            idFC: [{value: '', disabled: true}],
            basicInfo: fb.group({
              usernameFC: [{value: '', disabled: true}, Validators.required],
              nameFC: [null, [Validators.required, Validators.minLength(5)]],
              dobFC: [null, Validators.required],
              genderFC: [null],
              phoneFC: [null, [Validators.required, Validators.minLength(10)]],
            }),
            
            areaInfo: fb.group({
              stateFC: [null, [Validators.required, Validators.maxLength(30)]],
              districtFC: [null, [Validators.required, Validators.maxLength(30)]],
              pincodeFC: [null, [Validators.required, Validators.maxLength(6)]],
              areaNameFC: [null, [Validators.required, Validators.maxLength(30)]],
            })
        })
    }

  ngOnInit(): void {
    this.title.setTitle('Profile');
    this.profile();      
  }

  profile(){
      this.patientService.findPatient().subscribe({
        next: (res)=>{
            this.patient= res;
            this.form.controls['idFC'].setValue(this.patient.patientId);

            this.form.controls['basicInfo'].setValue({
                usernameFC: this.patient.login.username,
                nameFC: this.patient.patientName,
                dobFC: this.patient.patientDob,
                genderFC: this.patient.patientGender,
                phoneFC: this.patient.patientPhoneNo
            });
            this.form.controls['areaInfo'].setValue({
              stateFC: this.patient.area.state,
              districtFC: this.patient.area.district,
              pincodeFC: this.patient.area.pincode,
              areaNameFC: this.patient.area.areaName
            });
            
        },
        error: (err) =>{
            console.warn("error while finding the profile");
            console.log(err);
            this.resMsg.displaySnackBar('Error while finding profile!')
            
        }
    })
  }

  update() {
    
    //if old & new objects are same

    //else
    this.patientService.updatePatient(this.toUpdateRequest()).subscribe({
      next: (res) =>{
          this.patient= res;
          this.resMsg.displaySuccessCategoryAndMessage('Profile Updated',
            'Profile Updated Successfully');
          this.profile();
      },
      error: (err) =>{
        console.log('error while updatinf the proifle');
        console.log(err);
        
          this.resMsg.displayErrorCategoryAndMessage('Profile',
            'Profile Not Updated!');
      }
    });
  }
  
  private toUpdateRequest(): ProfileUpdateRequest{
    let request= new ProfileUpdateRequest();

    //const fields
    request.id= this.form.get('idFC')?.value;
    request.username= this.form.get('basicInfo.usernameFC')?.value;
    request.dob= this.form.get('basicInfo.dobFC')?.value;
    request.gender= this.form.get('basicInfo.genderFC')?.value;
    request.phoneNo= this.form.get('basicInfo.phoneFC')?.value;
    request.name= this.form.get('basicInfo.nameFC')?.value;

    request.area.state= this.form.get('areaInfo.stateFC')?.value;
    request.area.district= this.form.get('areaInfo.districtFC')?.value;
    request.area.pincode= this.form.get('areaInfo.pincodeFC')?.value;
    request.area.areaName= this.form.get('areaInfo.areaNameFC')?.value;
    console.log(request);
    
    return request;
  }
  
}

