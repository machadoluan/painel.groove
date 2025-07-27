import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = `${environment.apiUrl}/card`;

  createVip(dadosVip: any, file: File) {
    const formData = new FormData();

   formData.append('dadosVip', dadosVip)

    const sanitizedFileName = file.name.replace(/\s+/g, '-');
    formData.append('files', file, sanitizedFileName)

    console.log(formData)
    return this.http.post(`${this.apiUrl}/vip`, formData);

  }


  getVips() {
    return this.http.get(`${this.apiUrl}/vip`)
  }

  updateVip(id: string, dados: any, file?: File) {
    const formData = new FormData();
  
    // Adiciona os dados (como strings)
    for (const key in dados) {
      formData.append(key, dados[key]);
    }
  
    // Adiciona o arquivo, se houver
    if (file) {
      formData.append('file', file);
    }
  
    return this.http.patch(`${this.apiUrl}/edit?id=${id}`, formData);
  }
  

}
