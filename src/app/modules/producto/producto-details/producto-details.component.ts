import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '@producto/interfaces/producto.interface';
import { ProductoService } from '@producto/services/producto.service';

@Component({
  selector: 'app-producto-details',
  templateUrl: './producto-details.component.html',
  styleUrls: ['./producto-details.component.scss'],
  providers: [ProductoService]
})
export class ProductoDetailsComponent implements OnInit {
  producto: Producto
  id: string

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getProducto();
  }

  getProducto = () => {
    this.productoService.getProductsById(this.id)
    .subscribe(data => {
        this.producto = data;
      }, err => {
        console.log(err)
    })
  }

}
