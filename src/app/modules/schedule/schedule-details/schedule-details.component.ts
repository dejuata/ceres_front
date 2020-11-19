import { ScheduleService } from '@schedule/services/schedule.service';
import { Schedule } from '@schedule/interfaces/schedule.interface';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss']
})
export class ScheduleDetailsComponent implements OnInit {

  schedule: Schedule
  id: string

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getActivitie();
  }

  getActivitie(): void {
    this.scheduleService.getActivitieById(this.id)
      .subscribe(data => {
        this.schedule = data
      })
  }

}
