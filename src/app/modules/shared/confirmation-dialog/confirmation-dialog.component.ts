import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  message: any;

  constructor(
    private confirmDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {
    this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }

}
