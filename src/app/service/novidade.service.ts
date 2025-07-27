import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NovidadeService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = `${environment.apiUrl}`

  create(dados: any, file: File) {
    const formData = new FormData();

    formData.append('dados', dados)

    const sanitizedFileName = file.name.replace(/\s+/g, '-');
    formData.append('files', file, sanitizedFileName)

    console.log(formData)
    // return this.http.post(`${this.apiUrl}/vip`, formData);

  }

  getNovidades() {
    return this.http.get(`${this.apiUrl}`)
  }
}
