import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BitacoraService } from './../services/bitacora.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-bitacora-add',
  templateUrl: './bitacora-add.component.html',
  styleUrls: ['./bitacora-add.component.scss']
})

export class BitacoraAddComponent implements OnInit {

  DJANGO_SERVER = `${environment.baseUrl}`
  form: FormGroup;
  response: any;
  imageURL: string;

  constructor(private formBuilder: FormBuilder, private bitacoraService: BitacoraService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      worklog: ['']
    });
  }

  onChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('worklog').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('worklog').value);

    this.bitacoraService.worklog(formData).subscribe(
      (res) => {
        this.response = res;
        this.imageURL = `${this.DJANGO_SERVER}${res.file}`;
        console.log(res);
        console.log(this.imageURL);
      },
      (err) => {  
        console.log(err);
      }
    );
  }
}
