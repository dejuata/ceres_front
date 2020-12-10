import { Component, OnInit } from '@angular/core';
import { HomeService } from '@home/services/home.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Subject } from 'rxjs';
import { ScheduleService } from '@schedule/services/schedule.service';
import { Router } from '@angular/router';
import { Schedule } from '@schedule/interfaces/schedule.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private destroy$ = new Subject<any>();

  activities: any[] = [];
  data: any = {};
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
      center: 'title',
      right: 'prev,next today'
    },
    initialView: 'timeGridWeek',
    locale: 'es',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  constructor(
    private homeService: HomeService,
    private scheduleService: ScheduleService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataHome();
    this.getActivities();
    this.detailActivitie();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  getDataHome(): void {
    this.homeService.getDataHome()
      .subscribe(data => {
        this.data = data
        console.log("home", this.data)
      })
  }

  getActivities(): void {
    this.scheduleService.getActivities()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.calendarOptions.events = [...this.formatActivitie(data)]
      })
  }

  detailActivitie(): void {
    this.calendarOptions.eventClick = (info) => {
      this.router.navigate([`./dashboard/schedule/detail/${info.event._def.publicId}`])
    }
  }

  formatActivitie(data) {
    let result = [];
    data.forEach((item: Schedule) => {
      result.push({
        id: item.id,
        title: `${item.name_operator} - ${item.codigo_zona}`,
        date: item.schedule_date,
        start: `${item.schedule_date}T${item.start_hour}`,
        end: `${item.schedule_date}T${item.final_hour}`,
      })
    });
    return result
  }

}
