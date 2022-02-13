import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // <----
import { Meet } from '../models/meet.interface';

@Injectable({
  providedIn: 'root'
})
export class MeetService {
  url: string = 'https://localhost:4000/api/v1/meets';

  constructor(private http: HttpClient) { }

  getDates(date: string) {
    const body = { date };
    return this.http.post(`${this.url}/date`, body);
  }

  getOneMeet(id: string) {
    return this.http.get(`${this.url}/${id}`);
  }

  editMeet(meet: Meet, id: string) {
    return this.http.put(`${this.url}/${id}`, meet);
  }

  deleteMeet(meet: Meet, id: string) {
    return this.http.post(`${this.url}/${id}`, meet);
  }

  createMeet(meet: Meet) {
    return this.http.post(`${this.url}`, meet);
  }

}
