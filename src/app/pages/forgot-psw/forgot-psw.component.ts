import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ForgotPswRequest } from 'src/app/models/ForgotPswRequest';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';

@Component({
  selector: 'app-forgot-psw',
  templateUrl: './forgot-psw.component.html',
  styleUrls: ['./forgot-psw.component.css']
})
export class ForgotPswComponent implements OnInit {

  forgotPswForm !: FormGroup;
  btnDisabled: boolean= true;

  constructor(private fb: FormBuilder, private title: Title, private authService: AuthenticationService,
    private resMsg: DisplayResponseMessages, private router: Router) { 
      
  }

  ngOnInit(): void {
    this.title.setTitle('Forgot Password');
    this.forgotPswForm= this.fb.group({
      usernameFC: [null, [Validators.required]],
      codeFC: [null, [Validators.required, Validators.minLength(6)]],
      password: this.fb.group({
          pswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
          cnfPswFC: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
      })
    })
  }
  
  onKeyPress(event: KeyboardEvent){
      this.btnDisabled= (event.target as HTMLInputElement).value === '' ? true: false;
  }

  onSubmit(){
    // if(this.forgotPswForm.valid){
    //     this.resMsg.displaySnackBar('Some field are not valid');
    //     return;
    // }
    this.authService.updatePsw(this.forgotPsw()).subscribe({

      next: (res)=>{
          this.resMsg.displaySnackBar('Password Changed Successfully');
          this.router.navigate(['/login']);
      },
      error: (err)=>{
          console.error('Error while updating user password');
          this.resMsg.displayErrorCategoryAndMessage('Error', 'Password Not Changed!');
      }
    })
  }

  sendCode(){
      let username= this.forgotPswForm.controls['usernameFC'].value;
      this.authService.verifyUser(username).subscribe({
        next: (res)=>{
          this.resMsg.displaySnackBar('Verification Code Sent')
        },
        error: (err)=>{
            console.error('Code not sent');
            this.resMsg.displaySnackBar('Vefication Code Not Sent!');
        }
      })
  }

  forgotPsw(): ForgotPswRequest{
      let fp= new ForgotPswRequest();
      fp.username= this.forgotPswForm.controls['usernameFC'].value;
      let psw= this.forgotPswForm.get('password.pswFC');
      fp.psw= psw?.value;

      let cnfPsw= this.forgotPswForm.get('password.cnfPswFC');
      fp.cnfPsw= cnfPsw?.value;
      
      fp.code= this.forgotPswForm.controls['codeFC'].value;
      
      return fp;
  }
}
