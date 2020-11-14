import { Component, OnInit } from '@angular/core';
import { LaborService } from '@labor/services/labor.service';
import { Labor } from '@labor/interfaces/labor.interface';

@Component({
  selector: 'app-labor-list',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
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

  deleteLabor(id: string): void {
    this.laborService.deleteLabor(id)
      .subscribe(() => {
        this.labors = this.labors.filter(item => item.id != parseInt(id));
        alert("Labor eliminada")
      })
  }
}
