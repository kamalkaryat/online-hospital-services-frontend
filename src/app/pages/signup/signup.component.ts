import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/Area';
import { Password } from 'src/app/models/Password';
import { PatientSignupRequest } from 'src/app/models/SignupRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { PatientService } from 'src/app/services/patient-service/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm !: FormGroup;

  constructor(private patientService: PatientService, private fb: FormBuilder, 
    private resMsg: DisplayResponseMessages, private router: Router, private title: Title) {   }
  
    ngOnInit(): void {  
        this.title.setTitle('Signup');
        this.signupForm= this.fb.group({
              
          basicInfo: this.fb.group({
            usernameFC: [null, Validators.required],
            nameFC: [null, [Validators.required, Validators.minLength(5)]],
            dobFC: [null, Validators.required],
            genderFC: [null],
            phoneFC: [null, [Validators.required, Validators.minLength(10)]],
          }),
          
          areaInfo: this.fb.group({
            stateFC: [null, [Validators.required, Validators.maxLength(30)]],
            districtFC: [null, [Validators.required, Validators.maxLength(30)]],
            pincodeFC: [null, [Validators.required, Validators.maxLength(6)]],
            areaNameFC: [null, [Validators.required, Validators.maxLength(30)]],
          }),
          
          password: this.fb.group({
            pswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
            cnfPswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
          })
      })
    }
    
  public signup(): void{     

    this.patientService.register(this.toSignupRequest()).subscribe({
      next: (res) => {
        this.resMsg.displaySuccessCategory('Signup Successful');
        this.router.navigate(['/login']);
      },
      error: (err) =>{
        console.log("error while performing signup");  
        this.resMsg.displaySnackBar('Singnup Failed!');
      }
    })
  }

  private toSignupRequest(): PatientSignupRequest{

    let email= this.signupForm.get('basicInfo.usernameFC');
    let name= this.signupForm.get('basicInfo.nameFC');
    
    let dob= this.signupForm.get('basicInfo.dobFC');
    let gender= this.signupForm.get('basicInfo.genderFC');
    let phoneNo= this.signupForm.get('basicInfo.phoneFC');
    
    let area= new Area();
    let state= this.signupForm.get('areaInfo.stateFC');
    area.state= state?.value;

    let district= this.signupForm.get('areaInfo.districtFC');
    area.district= state?.value;
    
    let pincode= this.signupForm.get('areaInfo.pincodeFC');
    area.pincode= pincode?.value;

    let areaName= this.signupForm.get('areaInfo.areaNameFC');
    area.areaName= areaName?.value;

    let password= this.signupForm.get('password.pswFC');
    let confirmPassword= this.signupForm.get('password.cnfPswFC');
    
    let request= new PatientSignupRequest(name?.value, dob?.value, gender?.value, phoneNo?.value, email?.value, 
      password?.value, confirmPassword?.value, true, area);
    
    return request;
  }

}
