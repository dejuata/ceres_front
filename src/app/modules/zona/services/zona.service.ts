import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Zona } from '@zona/interfaces/zona.interface';


@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  endpoint = `${environment.baseUrl}/zones/`

  constructor(private http: HttpClient) { }

  getZonas(): Observable<Zona[]>{
    return this.http.get<Zona[]>(this.endpoint);
  }

  getZonaById(id: string): Observable<Zona>{
    return this.http.get<Zona>(`${this.endpoint}${id}`);
  }

  createZona(zona: Zona): Observable<Zona> {
    return this.http.post<Zona>(this.endpoint, zona);
  }

  updateZona(id: string, zona: Zona): Observable<Zona> {
    return this.http.put<Zona>(`${this.endpoint}${id}/`, zona);
  }

  deleteZona(id: number): Observable<Zona> {
    return this.http.delete<Zona>(`${this.endpoint}${id}`);
  }
}
