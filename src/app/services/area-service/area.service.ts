import { state } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private serverUrl= environment.apiBaseUrl+'/v1/area';
  
  constructor(private http: HttpClient) { }

  public findStates(): Observable<string[]>{
    return this.http.get<string[]>(`${this.serverUrl}/states`);
  }

  public findDistricts(state: string): Observable<string[]>{
    //let params= new HttpParams().set('state', state);
    state= state ? state : 'none';

    return this.http.get<string[]>(`${this.serverUrl}/states/${state}/districts`);
    //return this.http.get<string[]>(`${this.serverUrl}/states/${this.state}/districts`, {params: params});
  }

  public findPincodes(state: string, district: string): Observable<number[]>{
    // let params= new HttpParams();
    // params= params.append('state', state);
    // params= params.append('district', district);
    state= state ? state : 'none';
    district= district ? district : 'none';
    return this.http.get<number[]>(`${this.serverUrl}/states/${state}/districts/${district}/pincodes`);
  }

  public findAreaNames(state: string, district: string, pincode: number): Observable<string[]>{
    state= state ? state : 'none';
    district= district ? district : 'none';
    pincode= pincode>10000 ? pincode : 0;

    return this.http.get<string[]>(`${this.serverUrl}/states/${state}/districts/${district}/pincodes/${pincode}/areaNames`);
  }
}
