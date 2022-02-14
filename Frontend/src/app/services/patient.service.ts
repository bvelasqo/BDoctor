import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <----
import { Meet } from '../models/meet.interface';
import { ResponseApi } from '../models/response.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PatientService {
  url: string = 'http://localhost:4000/api/v1/patients';

  constructor(private http: HttpClient) { }

  getPatient(id: string): Observable<ResponseApi> {
    return this.http.get(`${this.url}/${id}`);
  }

  createPatient(patient: Meet): Observable<ResponseApi> {
    return this.http.post(`${this.url}`, patient);
  }

}
