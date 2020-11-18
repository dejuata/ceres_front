import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  endpoint = `${environment.baseUrl}/labors/`;

  constructor(private http: HttpClient) { }

  createSchedule(schedule: any): Observable<any> {
    return this.http.post<any>(this.endpoint, schedule)
  }
}
