import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) {}

  getAllUserData() {
    return this._http.get("http://localhost:4200/assets/data/users/users.json");
  
}

}
