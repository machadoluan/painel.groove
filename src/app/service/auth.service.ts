import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  private UrlApi = environment.apiUrl


  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticado(): boolean {
    const token = this.getToken()
    return !!token
  }

  getUserFromToken(): any | null {
    let token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      token = token.split('#')[0].trim();

      const tokenPayload = token.split('.')[1];

      // Decodificação correta do Base64Url
      const decodedPayload = JSON.parse(this.decodeBase64Url(tokenPayload));

      return decodedPayload;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  }

  private decodeBase64Url(str: string): string {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (base64.length % 4)) % 4);
    return atob(base64 + padding);
  }


  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['']);
    window.location.reload()
  }

  getUserFromId(id: number) {
    this.http.get(`${this.UrlApi}/${id}`)
  }


}
