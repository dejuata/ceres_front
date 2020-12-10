import { Component, OnInit } from '@angular/core';
import { Producto } from '@producto/interfaces/producto.interface';
import { AlertService } from './../../shared/alert/services/alert.service';
import { ProductoService } from '@producto/services/producto.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.scss'],
  providers: [ProductoService]
})
export class ProductoListComponent implements OnInit {

  products: Producto[] = [{id: 1, name: 'Producto001', brand: 'Brand001', model: 'Model001', serial: 'Serial001', type_pro: 'Type001', date_purchase: 'Data001', cost: 10, state: 1}];
  loading: boolean = false;

  constructor(
    private productoService: ProductoService,
    private confirmationDialogService: ConfirmationDialogService,
    private alertService: AlertService,
  ) {
    this.getProducts();
   }

  getProducts = () => {
    this.productoService.getProducts()
      .subscribe(data => {
          this.products = data;
          this.loading = true;
        }, err => {
          console.log(err)
      })
  }
/*
  deleteProducto(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      //console.log("Operación cancelada")
    })
  }
*/
  deleteProducto(id: string, producto: Producto): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea suspender este registro ?", () => {
      this.onDelete(id, producto);
    }, () => {
      //console.log("Operación cancelada")
    })
  }

  onDelete(id: string, producto: Producto) {
    this.productoService.deleteProducto(id, producto)
      .subscribe(() => {
        //this.products = this.products.filter(item => item.id != parseInt(id));
        this.alertService.success('El Producto ha sido dado de baja', { keepAfterRouteChange: true });
      })
  }

}
