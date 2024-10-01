import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

   private apiUrl = 'http://localhost:3000/api/formulario'

  constructor( private http: HttpClient ) { }

  //agrego form
  addFormulario(formData: any): Observable<any>{
    return this.http.post(this.apiUrl, formData); //URL que hace solicitud post al back
  }


  //recorro el arrgelo de forms para obteerlos
  getFormularios( page: number, limit: number): Observable<{formularios: any[], totalPages: number, currentPage: number}>{
    const params = {
      page: page.toString(),
      limit: limit.toString()
    };

    return this.http.get<{ formularios: any[], totalPages: number, currentPage: number }>(this.apiUrl, { params }); //URL que hace realizo get al back
  }


  updateFormulario( id:string, formData: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, formData); //URL que hace solicitud PUT al back
  }


  deleteFormulario( id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`); // url que hace la solicitud DELETE al back
  }
}
