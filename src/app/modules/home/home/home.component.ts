import { Component, OnInit } from '@angular/core';
import { HomeService } from '@home/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = {};

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.getDataHome();
  }

  getDataHome(): void {
    this.homeService.getDataHome()
      .subscribe(data => {
        this.data = data
        console.log("home", this.data)
      })
  }
}
