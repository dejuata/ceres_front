import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Bitacora } from '@bitacora/interfaces/bitacora.interface';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {

  endpoint = `${environment.baseUrl}/worklog/`
  constructor(private http: HttpClient) { }
  
  //public worklog(formData: FormData) {
    //return this.http.post<any>(this.endpoint, formData);
  //}
  getBitacora(): Observable<Bitacora[]>{
    return this.http.get<Bitacora[]>(this.endpoint);
  }

  getBitacoraById(id: string): Observable<Bitacora>{
    return this.http.get<Bitacora>(`${this.endpoint}${id}`);
  }

  createBitacora(bitacora: Bitacora): Observable<Bitacora> {
    return this.http.post<Bitacora>(this.endpoint, bitacora);
  }

  updateBitacora(id: string, bitacora: Bitacora): Observable<Bitacora> {
    return this.http.put<Bitacora>(`${this.endpoint}${id}/`, bitacora);
  }

  deleteBitacora(id: string): Observable<Bitacora> {
    return this.http.delete<Bitacora>(`${this.endpoint}${id}`);
  }
}