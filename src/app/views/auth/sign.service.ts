import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(
    private http: HttpClient
  ) { }


  login(login: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, {
      username: "annasmith",
      password: "password"
    });
  }
}
