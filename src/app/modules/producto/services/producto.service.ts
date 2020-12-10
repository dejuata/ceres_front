import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '@producto/interfaces/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  endpoint = `${environment.baseUrl}/products/`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.endpoint);
  }

  getProductsById(id: string): Observable<Producto>{
    return this.http.get<Producto>(`${this.endpoint}${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.endpoint, producto);
  }

  updateProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.endpoint}${id}/`, producto);
  }

  deleteProducto(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.endpoint}${id}`);
  }

}
