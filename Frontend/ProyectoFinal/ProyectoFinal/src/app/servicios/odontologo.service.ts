import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { ResponseApi } from '../interfaces/response-api';
import {  Odontologo} from '../interfaces/odontologo';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {

  apiBase: string = '/api/paciente/'
  constructor(private http: HttpClient){



  }




  getOdontologo(): Observable<ResponseApi> {

    return this.http.get<ResponseApi>(`${this.apiBase}Lista`)

  }

  save(request: Odontologo): Observable<ResponseApi> {

    return this.http.post<ResponseApi>(`${this.apiBase}Guardar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

  edit(request: Odontologo): Observable<ResponseApi> {

    return this.http.put<ResponseApi>(`${this.apiBase}Editar`, request, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })

  }

  delete(id: number): Observable<ResponseApi> {

    return this.http.delete<ResponseApi>(`${this.apiBase}Eliminar/${id}`);

  }
}
