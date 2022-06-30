import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalAdminGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router:
      Router){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(this.authService.isUserLoggedIn() && this.authService.getUser().roles[0]
        =='HOSPITAL_ADMIN'){
        return true;      
    }
    this.router.navigate(['login']);
    return false;
  }
  
}
