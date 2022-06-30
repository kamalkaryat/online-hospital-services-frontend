import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from 'src/app/models/Patient';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Hospital } from 'src/app/models/Hospital';
import { HospitalAdmin } from 'src/app/models/HospitalAdmin';
import { Lab } from 'src/app/models/Lab';
import { Product } from 'src/app/models/Product';
import { Doctor } from 'src/app/models/Doctor';
import { HospitalAdminSignupRequest } from 'src/app/models/HospitalAdminSignupRequest';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient, private authService: AuthenticationService){
      if(this.adminId === ''){
        let user= this.authService.getUser();
        this.adminId= user.id;
      }
  }

  private patientApiBaseUrl= environment.apiBaseUrl+'/v1/patients';
  private adminApiBaseUrl= environment.apiBaseUrl+'/v1/admin';

  private adminId= '';

  //doctors
  public findAllDoctors(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.adminApiBaseUrl}/doctors`);
  }

  //patient
  public findAllPatients(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.adminApiBaseUrl}/patients`);
  }

  public deletePatient(patientId: string): Observable<void>{
    return this.httpClient.delete<any>(`${this.patientApiBaseUrl}/${patientId}`);
  }
  
  //hospitals
  public findAllHospitals(): Observable<Hospital[]>{
    return this.httpClient.get<Hospital[]>(`${this.adminApiBaseUrl}/hospitals`);
  }

  public addHospital(hospital: Hospital): Observable<any>{
      return this.httpClient.post<Hospital>(`${this.adminApiBaseUrl}/hospitals`, hospital);
  }

  public manageHospital(action: string, id: string):Observable<any>{
      let reqParam= new HttpParams().append('action', action);
      const url= this.adminApiBaseUrl+'/hospitals/'+id;

      return this.httpClient.put<String[]>(url, {}, {params: reqParam});
  }

  //hospital-admins

  public findAllHospitalAdmins(): Observable<HospitalAdmin[]>{
    return this.httpClient.get<HospitalAdmin[]>(`${this.adminApiBaseUrl}/hospital-admins`);
  }

  public addHospitalAdmin(request: HospitalAdminSignupRequest): Observable<any>{
    return this.httpClient.post<HospitalAdminSignupRequest>(`${this.adminApiBaseUrl}/hospital-admins`, request);
  }

  public manageUsers(action: string, username: string):Observable<any>{
    let reqParam= new HttpParams().append('action', action);
    const url= this.adminApiBaseUrl+'/users/'+username;

    return this.httpClient.put<String[]>(url, {}, {params: reqParam});
  }
  
  //manage products

  public addProduct(newProduct: Product): Observable<any>{
    return this.httpClient.post<any>(`${this.adminApiBaseUrl}/products`, newProduct);
  }

  public updateProduct(updateProduct: Product): Observable<any>{
    return this.httpClient.put<any>(`${this.adminApiBaseUrl}/products`, updateProduct);
  }

  public deleteProduct(productId: any): Observable<any>{
    return this.httpClient.delete<any>(`${this.adminApiBaseUrl}/products/${productId}`);
  }
  //manage labs
  //1- Add lab

  public addLab(lab: Lab){
    return this.httpClient.post<Lab>(`${this.adminApiBaseUrl}/labs`, lab);
  }

  //2- Update Lab
  public updateLab(updatedLab: Lab){
      return this.httpClient.put(`${this.adminApiBaseUrl}/labs`, updatedLab);
  }

  //3- Delete Lab
  public manageLab(action: string, labId: string){
      let reqParam= new HttpParams().append('action', action);
      return this.httpClient.put(`${this.adminApiBaseUrl}/labs/${labId}`,{}, {params: reqParam});
  }

  public findAllLabs(): Observable<Lab[]>{
    return this.httpClient.get<Lab[]>(`${this.adminApiBaseUrl}/labs`);
  }
}
