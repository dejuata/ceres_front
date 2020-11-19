import { Component, OnInit } from '@angular/core';
import { Schedule } from '@schedule/interfaces/schedule.interface';
import { ScheduleService } from '@schedule/services/schedule.service';
import { AlertService } from '@shared/alert/services/alert.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';
import { language } from '@shared/datatable/language';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {

  activities: Schedule[] = [];
  dtOptions: DataTables.Settings = {};
  loading: boolean = false;

  constructor(
    private scheduleService: ScheduleService,
    private alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }

  ngOnInit(): void {
    this.dataTableOptions();
    this.getActivities();
  }

  getActivities(): void {
    this.scheduleService.getActivities()
      .subscribe(data => {
          this.activities = data;
          this.loading = true;
        }, err => {
          console.log(err)
      })
  }

  deleteActivitie(id: string): void {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", () => {
      this.onDelete(id);
    }, () => {
      // console.log("Operación cancelada")
    })
  }

  onDelete(id: string) {
    this.scheduleService.deleteActivitie(id)
      .subscribe(() => {
        this.activities = this.activities.filter(item => item.id != parseInt(id));
        this.alertService.success('La Actividad ha sido eliminada', { keepAfterRouteChange: true });
      })
  }

  dataTableOptions(): void {
    this.dtOptions = {
      pageLength: 10,
      language: language,
    };
  }

}
