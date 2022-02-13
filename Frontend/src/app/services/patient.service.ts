import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <----
import { Meet } from '../models/meet.interface';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url: string = 'https://localhost:4000/api/v1/patients';

  constructor(private http: HttpClient) { }

  getPatient(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  createPatient(patient: Meet) {
    return this.http.post(`${this.url}`, patient);
  }

}
