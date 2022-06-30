import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from 'src/app/models/User';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { Router} from '@angular/router';
import Swal from 'sweetalert2';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { Title } from '@angular/platform-browser';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  form !: FormGroup;
  
  ngOnInit(): void {
    this.title.setTitle('Login');
    this.form= this.fb.group({
        usernameFC: ['', Validators.required],
        passwordFC: ['', Validators.required]
    })
  }

  constructor(private snackBar: MatSnackBar, 
              private authService: AuthenticationService,
              private router: Router,
              private responseMessage: DisplayResponseMessages,
              private title: Title,
              private fb: FormBuilder){   }

  private showErrorAlert= false;
  private errorCode= 0;
  public login(){
      const authRequest= new AuthenticationRequest();
      authRequest.username= this.form.controls['usernameFC'].value;
      authRequest.password= this.form.controls['passwordFC'].value;

      //calling authentication service
      this.authService.doAuthentication(authRequest).subscribe({

        next: (res: JwtResponse) =>{
            this.authService.storeToken(res.token);            
            this.authService.setUser(res.user);
            this.showErrorAlert= false;

            //show success msg
            this.responseMessage.displaySuccessCategory("Login Successful");

            //Redirecting user to their respective home page
            if(res.user.roles[0]=='PATIENT')
              this.router.navigate(['patient'])
            
            else if(res.user.roles[0]=='HOSPITAL_ADMIN')
              this.router.navigate(['hospital-admin'])
            
            else if(res.user.roles[0]=='DOCTOR')
              this.router.navigate(['doctor'])
            
            else if(res.user.roles[0]=='ADMIN')
              this.router.navigate(['admin'])
            
            else
              this.router.navigate(['login'])
        },
        error: (err) =>{
            console.log("authentication failed");
            this.responseMessage.displayErrorCategoryAndMessage("Login Failed",'Error in Login!');
        }
    });       
  }
  
}
