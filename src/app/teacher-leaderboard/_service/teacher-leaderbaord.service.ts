import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeacherLeaderbaordService {
  constructor(private _http: HttpClient) {}

  getSectionsLeaderboard() {
    return this._http.get('http://localhost:4200/assets/data/users/users.json');
  }
}
