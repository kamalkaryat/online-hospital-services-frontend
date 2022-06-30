import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userInfo } from 'os';
import { Observable } from 'rxjs';
import { AppointmentRequest } from 'src/app/models/AppointmentRequest';
import { AppointmentRescheduleRequest } from 'src/app/models/AppointmentRescheduleRequest';
import { BookedAppointmentDto } from 'src/app/models/BookedAppointmentDto';
import { Patient } from 'src/app/models/Patient';
import { Product } from 'src/app/models/Product';
import { ProductPurchased } from 'src/app/models/ProductPurchased';
import { ProfileUpdateRequest } from 'src/app/models/ProfileUpdateRequest';
import { PurchaseProductRequest } from 'src/app/models/PurchaseProductRequest';
import { PatientSignupRequest } from 'src/app/models/SignupRequest';
import { TestOrderResponse } from 'src/app/models/TestOrderResponse';
import { TestRequest } from 'src/app/models/TestRequest';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientApiBaseUrl= environment.apiBaseUrl+'/v1/patients';

  constructor(private httpClient: HttpClient, 
    private authService: AuthenticationService) {
      if(this.patientId === ''){
          let user= this.authService.getUser();
          if(user)
            this.patientId= user.id;
      }      
  }
  
  private  patientId= '';        

  public register(request: PatientSignupRequest): Observable<Patient>{
    return this.httpClient.post<Patient>(`${this.patientApiBaseUrl}/`, request);
  }


  public findPatient(): Observable<Patient>{    
    return this.httpClient.get<Patient>(`${this.patientApiBaseUrl}/${this.patientId}`);
  }

  public updatePatient(updateRequest: ProfileUpdateRequest): Observable<Patient>{
    return this.httpClient.put<Patient>(`${this.patientApiBaseUrl}/profile`,
        updateRequest);
  }

  //appointments

  public bookAppointment(request: AppointmentRequest): Observable<AppointmentRequest>{
    request.patientId= this.patientId;
    return this.httpClient.post<AppointmentRequest>(
      `${this.patientApiBaseUrl}/${this.patientId}/appointments`,request);
  }

  public findBookedAppointments(): Observable<BookedAppointmentDto[]>{
    return this.httpClient.get<BookedAppointmentDto[]>(
      `${this.patientApiBaseUrl}/${this.patientId}/appointments`);
  }

  public cancelAppointment(bookingId: String): Observable<any>{
    return this.httpClient.delete(`${this.patientApiBaseUrl}/${this.patientId}/appointments/${bookingId}`);
  }

  public rescheduleAppointment(request: AppointmentRequest): Observable<any>{
    request.patientId= this.patientId;
    return this.httpClient.put<AppointmentRequest>(
      `${this.patientApiBaseUrl}/${this.patientId}/appointments`,request);
  }

  //tests
  public findTestHistory(): Observable<TestOrderResponse[]>{
    let reqParam= new HttpParams().append('id', this.patientId);
      return this.httpClient.get<TestOrderResponse[]>(`${this.patientApiBaseUrl}/tests`, {params: reqParam});
  }

  public testRequest(request: TestRequest):Observable<any>{
      request.patientId= this.patientId;
      return this.httpClient.post<TestRequest>(`${this.patientApiBaseUrl}/tests`, request);
  }
  
  //products

  public findAllPurchasedProducts(): Observable<ProductPurchased[]>{
      return this.httpClient.get<ProductPurchased[]>(
        `${this.patientApiBaseUrl}/${this.patientId}/products`);
  }

  public purchaseProduct(request: PurchaseProductRequest): Observable<any>{
      request.patientId= this.patientId;
      return this.httpClient.post<PurchaseProductRequest>(`${this.patientApiBaseUrl}/products`,request);
  }
}
