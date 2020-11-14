import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Usuario } from '@usuario/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  endpoint = `${environment.baseUrl}/users/`

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.endpoint);
  }

  getUsuarioById(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.endpoint}${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.endpoint, usuario);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.endpoint}${id}/`, usuario);
  }

  deleteUsuario(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.endpoint}${id}`);
  }
}
