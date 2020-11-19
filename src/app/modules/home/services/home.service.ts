import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  endpoint = `${environment.baseUrl}/home/`;

  constructor(private http: HttpClient) { }

  getDataHome(): Observable<any> {
    return this.http.get<any>(this.endpoint);
  }
}
