import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Labor } from '@labor/interfaces/labor.interface';


@Injectable({
  providedIn: 'root'
})
export class LaborService {

  endpoint = `${environment.baseUrl}/labors/`

  constructor(private http: HttpClient) { }

  getLabors(): Observable<Labor[]>{
    return this.http.get<Labor[]>(this.endpoint);
  }

  getLaborById(id: string): Observable<Labor>{
    return this.http.get<Labor>(`${this.endpoint}${id}`);
  }

  createLabor(labor: Labor): Observable<Labor> {
    return this.http.post<Labor>(this.endpoint, labor);
  }

  updateLabor(id: string, labor: Labor): Observable<Labor> {
    return this.http.put<Labor>(`${this.endpoint}${id}/`, labor);
  }

  deleteLabor(id: string): Observable<Labor> {
    return this.http.delete<Labor>(`${this.endpoint}${id}`);
  }
}
