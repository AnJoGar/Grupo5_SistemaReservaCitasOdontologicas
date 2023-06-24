import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseApi } from '../interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  apiBase: string = '/api/rol/';
  //private urlApi:string=environment.endpoint+"Menu";
  constructor(private http: HttpClient) { }

  getRoles(idUsuario:number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.apiBase}Lista?idUsuario=${idUsuario}`)
  }
}
