import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Bitacora } from '@bitacora/interfaces/bitacora.interface';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  endpoint = `${environment.baseUrl}/worklogs/`

  constructor(private http: HttpClient) { }

  //public worklog(formData: FormData) {
    //return this.http.post<any>(this.endpoint, formData);
  //}

  getActivitiesUser(id: string): Observable<any> {
    let url = `${environment.baseUrl}/home/actividades/`
    return this.http.get<any>(`${url}${id}`)
  }

  getBitacora(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>(this.endpoint);
  }

  getBitacoraById(id: string): Observable<Bitacora>{
    return this.http.get<Bitacora>(`${this.endpoint}${id}`);
  }

  createBitacora(bitacora: any): Observable<Bitacora> {
    return this.http.post<any>(this.endpoint, bitacora);
  }

  updateBitacora(id: string, bitacora: any): Observable<Bitacora> {
    return this.http.put<Bitacora>(`${this.endpoint}${id}/`, bitacora);
  }

  deleteBitacora(id: string): Observable<Bitacora> {
    return this.http.delete<Bitacora>(`${this.endpoint}${id}`);
  }
}
