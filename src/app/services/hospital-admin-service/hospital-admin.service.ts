import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { Doctor } from 'src/app/models/Doctor';
import { DoctorSignupRequest } from 'src/app/models/DoctorSignupRequest';
import { Hospital } from 'src/app/models/Hospital';
import { HospitalAdmin } from 'src/app/models/HospitalAdmin';
import { ProductQuantity } from 'src/app/models/ProductQuantity';
import { ProductStock } from 'src/app/models/ProductStock';
import { ProfileUpdateRequest } from 'src/app/models/ProfileUpdateRequest';
import { TestOrder } from 'src/app/models/TestOrder';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalAdminService {

  private id= '';
  private hospital: Hospital= new Hospital();
  
  private hospitalAdminApi= environment.apiBaseUrl+'/v1/hospital-admins';
  private publicApi= environment.apiBaseUrl+'/v1/public';

  constructor(private httpClient: HttpClient,private authService: AuthenticationService) { 
    if(this.id === ''){
        let user= authService.getUser();
        this.id= user.id;
        this.hospital= user.hospital;
    }
  }

  public getHospital(): Hospital{
      return this.hospital;
  }

  getHospitalAdminId(): string{
      return this.id;
  }
 
  updateTestStatus(orderId: string, status: string): Observable<any> {
    let reqParam= new HttpParams().append('status', status);
    return this.httpClient.put<any>(`${this.hospitalAdminApi}/tests/${orderId}`, {}, {params: reqParam})
  }
  //find profile
  public findProfile(): Observable<HospitalAdmin>{
      return this.httpClient.get<HospitalAdmin>(`${this.hospitalAdminApi}/profile/${this.id}`);
  }

  //update profile
  public updateProifle(updateRequest: ProfileUpdateRequest): Observable<any>{
    return this.httpClient.put<any>(`${this.hospitalAdminApi}/profile`, updateRequest);
  }

  //manage doctors
  public addDoctor(signupRequest: DoctorSignupRequest): Observable<any>{
      return this.httpClient.post<Doctor>(`${this.hospitalAdminApi}/doctors`, signupRequest);
  }
  
  public manageDoctor(action: string, username: string): Observable<any>{
      let reqParam= new HttpParams().append('action', action);

      let url= this.hospitalAdminApi+'/doctors/'+username;
      return this.httpClient.put<any>(url, {}, {params: reqParam});
  }

  public findDoctors(): Observable<Doctor[]>{
      let reqParam= new HttpParams().append('id', this.hospital.hospitalId);
      return this.httpClient.get<Doctor[]>(`${this.hospitalAdminApi}/doctors`, {params: reqParam});
  }
  //manage appointments
  public addAppointment(appointment: Appointment): Observable<any>{
    const url= this.hospitalAdminApi+'/appointments';  
    return this.httpClient.post<Appointment>(url, appointment);
  }

  public removeAppointment(appointmentId: string): Observable<any>{
    let url= this.hospitalAdminApi+'/'+this.id+'/appointments/'+appointmentId;
    return this.httpClient.delete(url);
  }

  public removeAllAppointments(): Observable<any>{
    let url= this.hospitalAdminApi+'/'+this.id+'/appointments';
    return this.httpClient.put(url, this.hospital.hospitalId);
  }

  public findAppointmentsInHospital(): Observable<Appointment[]>{
    const url= this.publicApi+'/hospitals/'+this.hospital.hospitalId+'/appointments';
    return this.httpClient.get<Appointment[]>(url);
  }
  //manage products

  public addOrUpdateStock(stock: ProductQuantity): Observable<any>{
    return this.httpClient.post<any>(`${this.hospitalAdminApi}/products`, stock);
  }
  
  public unregisterProduct(productId: string): Observable<any>{
      let reqParam= new HttpParams().append('hospitalId', this.hospital.hospitalId);
      return this.httpClient.put<String[]>(`${this.hospitalAdminApi}/products`,productId, {params: reqParam});
  }


  public findProductsStock(): Observable<ProductQuantity[]>{
      let reqParam= new HttpParams().append('id', this.hospital.hospitalId)
      return this.httpClient.get<ProductQuantity[]>(`${this.hospitalAdminApi}/products`,{params: reqParam});
  }

  findTestOrders(): Observable<TestOrder[]> {
      let reqParam= new HttpParams().append('id', this.hospital.hospitalId)
      return this.httpClient.get<TestOrder[]>(`${this.hospitalAdminApi}/tests`, {params: reqParam});
  }
}
