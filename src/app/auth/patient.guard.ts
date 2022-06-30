import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router:
      Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
    
    let flag= this.authService.isUserLoggedIn();
    let role= this.authService.getUser().roles[0];

    if(flag && role == 'PATIENT')
      return true;     
      
    this.router.navigate(['login']);
    return false;
  }
  
}
