import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Bitacora } from '@bitacora/interfaces/bitacora.interface';
import { BitacoraService } from '@bitacora/services/bitacora.service';

@Component({
  selector: 'app-bitacora-details',
  templateUrl: './bitacora-details.component.html',
  styleUrls: ['./bitacora-details.component.scss']
})
export class BitacoraDetailsComponent implements OnInit {

  bitacora: Bitacora
  id: string

  constructor(
    private bitacoraService: BitacoraService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getBitacora();
  }

  getBitacora(): void {
    this.bitacoraService.getBitacoraById(this.id)
      .subscribe(data => {
        this.bitacora = data;
      })
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }
}
