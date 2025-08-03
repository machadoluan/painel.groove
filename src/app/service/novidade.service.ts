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

  private apiUrl = `${environment.apiUrl}/novidades`

  create(dados: any, file: File) {
    const formData = new FormData();

    formData.append('dados', JSON.stringify(dados))

    const sanitizedFileName = file.name.replace(/\s+/g, '-');
    formData.append('file', file, sanitizedFileName)

    console.log(formData)
    return this.http.post(`${this.apiUrl}/create`, formData);

  }

  update(id: number, dados: any, file?: File) {
    const formData = new FormData();

    formData.append('dados', JSON.stringify(dados))
    if (file) {
      const sanitizedFileName = file.name.replace(/\s+/g, '-');
      formData.append('file', file, sanitizedFileName)
    }

    console.log(formData)
    return this.http.post(`${this.apiUrl}/update/${id}`, formData);

  }




  getNovidades() {
    return this.http.get(`${this.apiUrl}`)
  }

  updateVisibilidade(id: number, visibilidade: boolean) {
    return this.http.post(`${this.apiUrl}/visibilidade/${id}`, { visibilidade: visibilidade })
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`)
  }

}
