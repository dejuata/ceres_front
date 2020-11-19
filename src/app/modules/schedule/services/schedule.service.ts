import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Schedule } from '@schedule/interfaces/schedule.interface';
import { UsuarioService } from '@usuario/services/usuario.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  endpoint = `${environment.baseUrl}/schedules/`;

  constructor(
    private http: HttpClient,
    private userService: UsuarioService
  ) { }

  getActivities(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.endpoint)
  }

  getActivitieById(id: string): Observable<Schedule>{
    return this.http.get<Schedule>(`${this.endpoint}${id}`);
  }

  createActivitie(schedule: Schedule): Observable<Schedule> {
    return this.http.post<Schedule>(this.endpoint, schedule)
  }

  updateActivitie(id: string, labor: Schedule): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.endpoint}${id}/`, labor);
  }

  deleteActivitie(id: string): Observable<Schedule> {
    return this.http.delete<Schedule>(`${this.endpoint}${id}`);
  }
}
