import { Router } from '@angular/router';
import { Usuario } from '@usuario/interfaces/usuario.interface';
import { ScheduleService } from '@schedule/services/schedule.service';
import { Schedule } from '@schedule/interfaces/schedule.interface';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { UsuarioService } from '@usuario/services/usuario.service';
import { map, take, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private destroy$ = new Subject<any>();

  activities: any[] = [];
  nameOperator: string = '';
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
    private scheduleService: ScheduleService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getActivities();
    this.detailActivitie();
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
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
