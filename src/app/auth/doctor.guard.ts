import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {
  
  constructor(private authService: AuthenticationService, 
    private router: Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Doctor Guard called');
    
    if(this.authService.isUserLoggedIn() && this.authService.getUser().roles[0]
        =='DOCTOR'){
        return true;      
    }
    this.router.navigate(['login']);
    return false;
  }
}
