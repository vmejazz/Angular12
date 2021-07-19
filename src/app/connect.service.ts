import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  _url = 'http://localhost:2500/singup';

  constructor(private _http: HttpClient) { }

  connectRequest(user: { email: string, password: string }) {
    return this._http.post<any>(this._url, user)
  }
}
