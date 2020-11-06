import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Zona } from '@zona/interfaces/zona.interface';
import { ZonaService } from '@zona/services/zona.service';

@Component({
  selector: 'app-zona-details',
  templateUrl: './zona-details.component.html',
  styleUrls: ['./zona-details.component.scss']
})
export class ZonaDetailsComponent implements OnInit {

  zona: Zona
  id: string

  constructor(
    private zonaService: ZonaService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getZona();
  }

  getZona(): void {
    this.zonaService.getZonaById(this.id)
      .subscribe(data => {
        this.zona = data;
      })
  }

}
