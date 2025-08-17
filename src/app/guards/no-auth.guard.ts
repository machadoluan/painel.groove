import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router) { }

  isAuthenticado(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  canActivate(): boolean {
    if (this.isAuthenticado()) {
      this.router.navigate(['/']); // Redireciona se já autenticado
      return false;
    }
    return true; // Permite acesso se não autenticado
  }
}
