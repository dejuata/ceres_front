import { Component, OnInit } from '@angular/core';
import { ZonaService } from '@zona/services/zona.service';
import { Zona } from '@zona/interfaces/zona.interface';

@Component({
  selector: 'app-zona-list',
  templateUrl: './zona-list.component.html',
  styleUrls: ['./zona-list.component.scss']
})
export class ZonaListComponent implements OnInit {

  zonas: Zona[] = [];

  constructor(
    private zonaService: ZonaService
  ) {
  }

  ngOnInit(): void {
    this.getZonas();
  }

  getZonas(): void {
    this.zonaService.getZonas()
      .subscribe(data => {
        this.zonas = data;
      }, err => {
        console.log(err)
      })
  }

  deleteZona(id: string): void {
    this.zonaService.deleteZona(id)
      .subscribe(() => {
        this.zonas = this.zonas.filter(item => item.id != parseInt(id));
        alert("zona eliminada")
      })
  }

}
