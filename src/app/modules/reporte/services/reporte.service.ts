import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Reporte } from '@reporte/interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  endpoint = `${environment.baseUrl}/home/actividades_operario/`

  constructor(private http: HttpClient) { }

  getActividadesOperario(): Observable<any>{
    return this.http.get<any>(this.endpoint);
  }
}
