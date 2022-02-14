import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <----
import { Meet } from '../models/meet.interface';
import { ResponseApi } from '../models/response.interface';
import { Observable } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  url: string = 'http://localhost:4000/api/v1/meets';

  constructor(private http: HttpClient) { }

  getDates(date: string): Observable<ResponseApi> {
    const body = { date };
    return this.http.post(`${this.url}/date`, body);
  }

  getOneMeet(id: string): Observable<ResponseApi> {
    return this.http.get(`${this.url}/${id}`);
  }

  editMeet(meet: Meet, id: string): Observable<ResponseApi> {
    return this.http.put(`${this.url}/${id}`, meet);
  }

  deleteMeet(meet: Meet, id: string): Observable<ResponseApi> {
    return this.http.post(`${this.url}/${id}`, meet);
  }

  createMeet(meet: Meet): Observable<ResponseApi> {
    return this.http.post(`${this.url}`, meet);
  }

}
