import { Injectable, OnInit } from '@angular/core';
import { User } from '../_modules/usuario';
import { Router } from '@angular/router';
import { Http } from './http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  private usuario : User | any;
  private usuarioAutenticado : boolean = false;
  private token: string = '';

  constructor(
    private router : Router,
    private httpService : Http,
  ) {
    // Verificar se já tem token salvo ao inicializar
    this.checkAuthStatus();
  }

  ngOnInit() {
    
  }

  checkAuthStatus() {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      this.token = savedToken;
      this.usuarioAutenticado = true;
    }
  }
  
  setUsuario(usuario : User) {
    this.usuario = usuario;
  }

  getUsuario() {
    return this.usuario;
  }

  setToken(token: string) {
    this.token = token;
    this.usuarioAutenticado = true; // ← IMPORTANTE: Definir como autenticado
    localStorage.setItem('authToken', token);
  }

  getToken() {
    // Sempre verificar o localStorage também
    if (!this.token) {
      this.token = localStorage.getItem('authToken') || '';
    }
    return this.token;
  }

  usuarioEstaAutenticado() {
    // Verificar tanto a propriedade quanto o localStorage
    if (!this.usuarioAutenticado) {
      const savedToken = localStorage.getItem('authToken');
      if (savedToken) {
        this.token = savedToken;
        this.usuarioAutenticado = true;
      }
    }
    return this.usuarioAutenticado;
  }

  logout() {
    this.usuarioAutenticado = false;
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
