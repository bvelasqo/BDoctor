import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Meet } from 'src/app/models/meet.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css',
  "../../../../node_modules/sweetalert2/src/sweetalert2.scss"]
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  id_reprogramming = '';
  name = '';
  phone_number = '';
  date_meet = '';
  email = '';
  tabIndex = 0;
  btnDeleteActivate = false;

  constructor(private route: ActivatedRoute) {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      time_meet: new FormControl('', [Validators.required, Validators.minLength(2)]),
      date_meet: new FormControl('', [Validators.required]),
    });
    this.id_reprogramming = this.route.snapshot.params['id'];
    this.btnDeleteActivate = this.id_reprogramming ? true : false;
    console.log(this.btnDeleteActivate);

  }

  ngOnInit(): void {

  }

  downData(): void {
    if (this.form.value.id == '') return;
    const id_patient: string = this.form.value.id;
    this.email = "Brandon@gmail.com";
    this.name = "Brandon";
    this.phone_number = "251684";
    this.date_meet = "2021-02-19";
    this.form.value.email = this.email;
    this.form.value.name = this.name;
    this.form.value.phone_number = this.phone_number;
    this.form.value.date_meet = this.date_meet;
  }

  clickTime(value: any, number: number): void {
    console.log(value);
    this.form.value.time_meet = 'value';
    this.tabIndex = number;
    console.log(this.form.value);

  }

  onSubmit(valueForm: Meet): void {
    console.log(valueForm);
    Swal.fire("Cita agendada!", "Puedes reprogramar tu cita aquí: localhost", "success");
  }


}
