import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthenticationRequest } from 'src/app/models/AuthenticationRequest';
import { ForgotPswRequest } from 'src/app/models/ForgotPswRequest';
import { JwtResponse } from 'src/app/models/JwtResponse';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private serverUrl= environment.apiBaseUrl;
  public loggedInSubject= new Subject<Boolean>();

  constructor(private httpClient: HttpClient) { }

  //send a code in user email address
  public verifyUser(username: any): Observable<any> {
      return this.httpClient.post<any>(`${this.serverUrl}/auth/verify`, username);
  }

  
  //call forgot password end point
  public updatePsw(request: ForgotPswRequest): Observable<any> {
    return this.httpClient.put<any>(`${this.serverUrl}/auth/forgotPsw`, request);
  }

  //call authentication api in backend 
  public doAuthentication(request: AuthenticationRequest): Observable<JwtResponse>{
      return this.httpClient.post<JwtResponse>(`${this.serverUrl}/auth/login`, request);
  }

  //find current logged-in user 
  public getCurrentLoggedinUser() : Observable<any>{
      return this.httpClient.get<any>(`${this.serverUrl}/auth/currentUser`);
  }

  //store jwt token locally
  public storeToken(token: string): void{
    localStorage.setItem("token", token);
    //creating a user logged-in event
    // this.loggedInSubject.next(true);
  }
  public getToken(): any{
    return localStorage.getItem("token");
  }

  //check whether a user is logged-in or not
  public isUserLoggedIn(): boolean {
      let token= localStorage.getItem("token");
      return token!=null && token.trim().length>1;
  }

  //on logout, remove token from local storage
  public logout(): boolean{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  //store user details locally
  public setUser(user: User): void{
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get user details from local storage
  public getUser(): User{
    let user= localStorage.getItem("user");
    return user==null ? null : JSON.parse(user);
  }
}
