import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import { HospitalAdmin } from 'src/app/models/HospitalAdmin';
import { ProfileUpdateRequest } from 'src/app/models/ProfileUpdateRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { HospitalAdminService } from 'src/app/services/hospital-admin-service/hospital-admin.service';

@Component({
  selector: 'app-hospital-admin-profile',
  templateUrl: './hospital-admin-profile.component.html',
  styleUrls: ['./hospital-admin-profile.component.css']
})
export class HospitalAdminProfileComponent implements OnInit {

  haUpdateForm= new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.maxLength(20)),
    dob: new FormControl('', Validators.required),
    gender: new FormControl('Male'),
    phoneNo: new FormControl('', Validators.maxLength(10)),
    username: new FormControl(''),
    hospital: new FormControl(''),
  });
  
  hAdmin= new HospitalAdmin();

  constructor(private hAdminService: HospitalAdminService, 
    private responseMsg: DisplayResponseMessages,
    private title: Title) { 
  }

  ngOnInit(): void {
    this.title.setTitle('Profile');
    this.profile();      
  }

  profile(){
      this.hAdminService.findProfile().subscribe({
        next: (res)=>{
            this.hAdmin= res;      
            this.haUpdateForm.controls['id'].setValue(this.hAdmin.hospitalAdminId);
            this.haUpdateForm.controls['name'].setValue(this.hAdmin.hospitalAdminName);
            this.haUpdateForm.controls['dob'].setValue(this.hAdmin.hospitalAdminDob);
            this.haUpdateForm.controls['gender'].setValue(this.hAdmin.hospitalAdminGender);
            this.haUpdateForm.controls['phoneNo'].setValue(this.hAdmin.hospitalAdminPhoneNo);
            this.haUpdateForm.controls['username'].setValue(this.hAdmin.login.username);
            this.haUpdateForm.controls['hospital'].setValue(this.hAdmin.hospital.hospitalName);
        },
        error: (err) =>{
            console.error("error while finding the hospitalAdmin profile");
            this.responseMsg.displaySnackBar('Error while searching profile');
        }
    })
  }

  onUpdate() {
    let request= new ProfileUpdateRequest();

    //const fields
    request.id= this.haUpdateForm.controls['id'].value;
    request.username= this.haUpdateForm.controls['username'].value;
    request.hospital= this.hAdmin.hospital;
    request.dob= this.haUpdateForm.controls['dob'].value;
    request.gender= this.haUpdateForm.controls['gender'].value;
    request.phoneNo= this.haUpdateForm.controls['phoneNo'].value;
    request.name= this.haUpdateForm.controls['name'].value;

    this.hAdminService.updateProifle(request).subscribe(
      (res =>{
          this.hAdmin= res;
          this.responseMsg.displaySnackBar('Profile Updated');
      }),
      (err =>{
          console.error('Error in Updating profile');
          this.responseMsg.displayErrorCategoryAndMessage('Error',
            'Profile Not Updated!');
      })
    );
  }
  
  
}
