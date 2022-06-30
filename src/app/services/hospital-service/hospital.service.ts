import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentResponse } from 'src/app/models/AppointmentResponse';
import { Doctor } from 'src/app/models/Doctor';
import { Hospital } from 'src/app/models/Hospital';
import { Lab } from 'src/app/models/Lab';
import { Product } from 'src/app/models/Product';
import { ProductStock } from 'src/app/models/ProductStock';
import { ProductStockResponse } from 'src/app/models/ProductStockResponse';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class HospitalService {

  private publicApisBaseUrl= environment.apiBaseUrl+'/v1/public';

  constructor(private httpClient: HttpClient) { }
  
  //extract it from url otherwise it will be assigned with default values
  private filters= 'none';
  private hospitalId= 'bbb';

  public findHospitals(filters: string): Observable<Hospital[]>{
      let reqParam= new HttpParams();
      reqParam= reqParam.append('filters',filters);
      return this.httpClient.get<Hospital[]>(`${this.publicApisBaseUrl}/hospitals`,{params: reqParam});
  }

  public findDoctors(filters: string): Observable<Doctor[]>{
      let reqParam= new HttpParams().append('filters', filters);
      return this.httpClient.get<Doctor[]>(`${this.publicApisBaseUrl}/doctors`, {params: reqParam});
  }

  public findLabs(): Observable<Lab[]>{
      return this.httpClient.get<Lab[]>(`${this.publicApisBaseUrl}/labs`);
  }

  public findAppointmentInHospital(name: string, date: string): Observable<AppointmentResponse[]>{
      let params= new HttpParams();
      params= params.append('name', name);
      params= params.append('date', date);
      
      const url= this.publicApisBaseUrl+'/hospitals/appointments';
      return this.httpClient.get<AppointmentResponse[]>(url, {params: params});
  }

  public findProducts(): Observable<Product[]>{
      return this.httpClient.get<Product[]>(`${this.publicApisBaseUrl}/products`);
  }

  public findProductStock(name: string, category: string): Observable<ProductStockResponse[]>{
    let reqParam= new HttpParams();
    reqParam= reqParam.append('category', category);
    reqParam= reqParam.append('name', name);    
    
    let url= this.publicApisBaseUrl+"/hospitals/products/stock";
    return this.httpClient.get<ProductStockResponse[]>(url, {params: reqParam});
  }

  public findProductCategory(): Observable<string[]>{
    let url= this.publicApisBaseUrl+'/products/category';
    return this.httpClient.get<string[]>(url);
  }
  
  public findProductsByCategory(category: string): Observable<string[]>{
    let url= this.publicApisBaseUrl+'/products/category/'+category;
    let reqParam= new HttpParams().append('category', category);
    return this.httpClient.get<string[]>(url, {params: reqParam});
  }

  findAppointmentId(hospitalName: any, date: any): Observable<string> {
    let reqParam= new HttpParams();
    reqParam= reqParam.append('hospitalName', hospitalName);
    reqParam= reqParam.append('date', date);
    
    return this.httpClient.get<string>(`${this.publicApisBaseUrl}/appointments`,{params: reqParam});
  }
}
