import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({providedIn: 'root'})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth'; //url del back

  constructor( private http: HttpClient) { }

  //metodo para registrar un usuario

  register(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData)
    .pipe(
      tap((response: any) =>{
        if(response.token){
          //guardo token si es que recibo el registro
          localStorage.setItem('token', response.token)
        }
      })
    )
  }

  //metodo para iniciar sesion
  login(userData: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,userData).pipe(
      //guardamos el token y el rol en el local
      tap(( response: any)=>{
        if (response.token) {
          localStorage.setItem('token', response.token); //guardar el token JWT
          localStorage.setItem('role', response.role); //guardar el rol del usuario
        }
      })
    )
  }

  //metodo para obetener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //metodo para obtener el rol del usuario
  getRole(): string | null{
    return localStorage.getItem('role')//obtengo el rol
  }

  //metodo para cerrar sesion (logout)
  logout(): void{
    localStorage.removeItem('token'); // Limpiar token
    localStorage.removeItem('role');  // Limpiar rol
  }
}
