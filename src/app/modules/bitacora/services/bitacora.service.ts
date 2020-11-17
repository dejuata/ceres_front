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
  
  public worklog(formData: FormData) {
    return this.http.post<any>(this.endpoint, formData);
  }
}