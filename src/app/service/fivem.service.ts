import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FivemService {
  private serverId = 'l69px7'; // <-- coloque o seu ID aqui
  private url = `https://servers-frontend.fivem.net/api/servers/single/${this.serverId}`;

  constructor(private http: HttpClient) {}

  getServerStatus() {
    return this.http.get<any>(this.url).pipe(
      catchError(err => {
        console.error('Erro ao buscar servidor FiveM:', err);
        return of(null); // retorna null se der erro
      })
    );
  }
}
