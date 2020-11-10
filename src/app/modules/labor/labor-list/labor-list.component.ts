import { Component, OnInit } from '@angular/core';
import { LaborService } from '@labor/services/labor.service';
import { Labor } from '@labor/interfaces/labor.interface';

@Component({
  selector: 'app-labor-list',
  templateUrl: './labor-list.component.html',
  styleUrls: ['./labor-list.component.scss']
})

export class LaborListComponent implements OnInit {

  labors: Labor[] = [];

  constructor(
    private laborService: LaborService
  ) { }

  ngOnInit(): void {
    this.getLabors();
  }

  getLabors(): void {
    this.laborService.getLabors().subscribe(data => {
        this.labors = data;
      }, err => {
        console.log(err)
      })
  }
}
