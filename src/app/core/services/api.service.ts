import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}login`, body);
  }

  send(body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}panic/send`, body);
  }

  cancel(body: any): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}panic/cancel`, body);
  }

  history(params: any): Observable<any> {
    return this.http.get<any>(`${environment.serverUrl}panic/history`, {params});
  }
}
