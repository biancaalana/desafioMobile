import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Http {
  private baseUrl = 'http://localhost:9000';
  
  constructor(private http: HttpClient) { }

  // Fazer login e retornar token
  login(email: string, password: string): Observable<any> {
    const body = { email: email, password: password };
    return this.http.post(`${this.baseUrl}/auth/login`, body);
  }

  // Criar colaborador (precisa do token)
  createUser(name: string, email: string, password: string, cpf: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    console.log('📋 Headers:', headers.keys());
    
    const body = {
      name: name,
      email: email,
      password: password,
      cpf: cpf
    };
    
    return this.http.post(`${this.baseUrl}/user/create`, body, { 
    headers,
    observe: 'response' // Para ver todos os detalhes da resposta
  });
  }

  // Listar colaboradores (precisa do token)
  getCollaborators(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get(`${this.baseUrl}/collaborator`, { headers });
  }
}