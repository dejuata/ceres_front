import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';
import { ConfirmationDialogService } from '@shared/confirmation-dialog/services/confirmation-dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private confirmationDialogService: ConfirmationDialogService,
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      console.log("mama", user);
    })

    console.log("usuario",this.authService.userValue)
  }

  showDialog() {
    this.confirmationDialogService.confirmThis("¿Esta seguro que desea eliminar este registro ?", function () {
      alert("Yes clicked");
    }, function () {
      alert("No clicked");
    })
  }

}
