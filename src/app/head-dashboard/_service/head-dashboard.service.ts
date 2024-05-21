import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeadDashboardService {
  constructor(private _http: HttpClient) {}
  getAllStudentsData() {
    return this._http.get('http://localhost:4200/assets/data/users/users.json');
  }
}
