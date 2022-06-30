import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { User } from 'src/app/models/User';
import { DisplayResponseMessages } from 'src/app/ResponseMessages/DisplayResponseMessages';
import { AuthenticationService } from 'src/app/services/authentication-service/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isUserLoggedIn= false;

  constructor(public authService: AuthenticationService,
      public router: Router, private responseMessage: DisplayResponseMessages) { }

  ngOnInit(): void {
      this.authService.loggedInSubject.asObservable().subscribe(data=>{
          this.isUserLoggedIn= true;          
      });
  }

  public logout(): void{
      if(this.authService.logout())
        this.router.navigate(['login']);
      else
        this.responseMessage.displayErrorCategory("Error during logout");        
  }

  home(){
    const user= this.authService.getUser();
    const role= user.roles[0];
    
    if(role === 'PATIENT')
        this.router.navigate(['patient']);
    else if(role === 'DOCTOR')
      this.router.navigate(['doctor']);
    else if(role === 'HOSPITAL_ADMIN')
      this.router.navigate(['hospital-admin']);
    else if(role === 'ADMIN')
      this.router.navigate(['admin']);
  }
}
