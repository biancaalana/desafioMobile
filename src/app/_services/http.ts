import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {

  private apiUrl = 'https://api.inspecoesEPI.com'; //url api

  constructor(private http: HttpClient) { }

  //Método GET
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${endpoint}`);
  }

  //Método POST
  postData(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, body);
  }
}
