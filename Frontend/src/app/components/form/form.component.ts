import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Meet } from 'src/app/models/meet.interface';
import { MeetService } from 'src/app/services/meet.service';
import { PatientService } from 'src/app/services/patient.service';
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

  times = [];

  constructor(private route: ActivatedRoute, private meetServices: MeetService, private patientService: PatientService) {
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
    if (this.id_reprogramming) {
      this.meetServices.getOneMeet(this.id_reprogramming).subscribe(
        res => {
          this.form.value.id = res.content[0].id_patient
          this.email = res.content[0].email;
          this.name = res.content[0].name;
          this.phone_number = res.content[0].phone_number;
          this.date_meet = res.content[0].date_meet.slice(0,10);
          this.form.value.time_meet =  res.content[0].time_meet;
          this.form.value.email = this.email;
          this.form.value.name = this.name;
          this.form.value.phone_number = this.phone_number;
          this.form.value.date_meet = this.date_meet;
          console.log(this.form.value);
        },
        err => {
          this.btnDeleteActivate = false;
          Swal.fire('Error', 'Error encontrando tu cita, contáctanos 3244483045', 'error');
        }
      )
    }
  }

  ngOnInit(): void {
  }

  onchangeDate() {
    console.log(this.form.value.date_meet);
    this.meetServices.getDates(this.form.value.date_meet).subscribe(
      res => {
        console.log( res.content);
        this.times = res.content ? res.content : []
        
      },
      err => {
        Swal.fire('Error', 'Error consultando horarios disponibles en la fecha dada', 'error')
      }
    )

  }
  downData(): void {
    if (this.form.value.id == '') return;
    let patient = undefined;
    const id_patient: string = this.form.value.id;
    this.patientService.getPatient(id_patient).subscribe(
      res => {
        console.log("down ", res);

        if (res.content == undefined) {
          Swal.fire('No se encontró el paciente en la base de datos, digite los datos necesarios.');
          return;
        }
        this.email = res.content.email;
        this.name = res.content.name;
        this.phone_number = res.content.phone_number;
        this.form.value.email = this.email;
        this.form.value.name = this.name;
        this.form.value.phone_number = this.phone_number;
        console.log(this.form.value);

      },
      error => { }
    )

  }

  clickTime(value: any, number: number): void {
    this.form.value.time_meet = value;
    this.tabIndex = number;
    console.log(this.form.value);
  }

  onSubmit(valueForm: Meet): void {
    console.log(valueForm);
    this.patientService.createPatient(valueForm).subscribe(
      res => {
        this.meetServices.createMeet(valueForm).subscribe(
          res => {
            console.log(res);
            Swal.fire("Cita agendada!", `Tus datos  Puedes reprogramar tu cita aquí: localhost`, "success");
          },
          err => {
            console.log(err);

            Swal.fire("Error", "Hubo un error agendando la cita", "error");
          }
        )
      },
      err => {
        this.meetServices.createMeet(valueForm).subscribe(
          res => {
            console.log(res);
            Swal.fire("Cita agendada!", `Puedes reprogramar tu cita aquí: localhost`, "success");
          },
          err => {
            console.log(err);
            Swal.fire("Error!", "Hubo un error agendando la cita", "error");
          }
        )
      }
    )

  }


}
