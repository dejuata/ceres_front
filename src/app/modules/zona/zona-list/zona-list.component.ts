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
  zona: Zona;

  constructor(
    private zonaService: ZonaService
  ) {
    this.getZonas();
  }

  ngOnInit(): void {
  }

  getZonas(): void {
    this.zonaService.getZonas().subscribe(data => {
      this.zonas = data;
    }, err => {
      console.log(err)
    })
  }

}
