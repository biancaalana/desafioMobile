import { Injectable } from '@angular/core';
import { Login } from '../_modules/usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuario : Login | any;
  private usuarioAutenticado : boolean = false;

  constructor(
    private router : Router
  ) {}
  
  setUsuario(usuario : Login) {
    this.usuario = usuario;
  }

  getUsuario() {
    return this.usuario;
  }

  login(credentials: any): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simular validação (substituir pela lógica real)
        if (credentials.email === 'usuario@exemplo.com' && credentials.password === '123456') {
          resolve({ success: true, token: 'fake-jwt-token' });
          this.usuarioAutenticado = true;
          this.router.navigate(['/home']);
        } else {
          reject({ error: 'Credenciais inválidas' });
          this.usuarioAutenticado = false;
        }
      }, 1500);
    });
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
