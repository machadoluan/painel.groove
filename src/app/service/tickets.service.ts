import { inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  private http = inject(HttpClient);


  private UrlApi = environment.apiUrl


  getTickets() {
    return this.http.get(`${this.UrlApi}/tickets`)
  }
}
