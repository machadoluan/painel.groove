import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private http: HttpClient
  ) { }


  private apiUrl = `${environment.apiUrl}/analytics`;

  getLog() {
    return this.http.get(`${this.apiUrl}/dashboard`)
  }

}
