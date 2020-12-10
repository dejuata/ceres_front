import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '@producto/interfaces/producto.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  baseurl = "http://localhost:8000/"
  endpoint = `${environment.baseUrl}/products/`;
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'}); 

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
 /*
  deleteProducto(id: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.endpoint}${id}`);
  }
*/
  deleteProducto(id: string, producto: Producto): Observable<Producto> {
    //console.log('ESTE ES EL PRODUCTO: -> '+producto.name)
    producto.state = 0
    return this.http.put<Producto>(`${this.endpoint}${id}/`, producto);
  }

}
