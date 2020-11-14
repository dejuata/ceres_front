import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Labor } from '@labor/interfaces/labor.interface';
import { LaborService } from '@labor/services/labor.service';

@Component({
  selector: 'app-labor-details',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})

export class LaborDetailsComponent implements OnInit {

  labor: Labor
  id: string

  constructor(
    private laborService: LaborService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getLabor();
  }

  getLabor(): void {
    this.laborService.getLaborById(this.id)
      .subscribe(data => {
        this.labor = data;
      })
  }
}
