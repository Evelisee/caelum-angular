import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Foto } from '../foto/foto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private url = 'http://localhost:3000/v1/fotos/'

  constructor(
    private conexaoApi: HttpClient
  ) {}
  
  listar(): Observable<Foto[]>{
    return this.conexaoApi.get<Foto[]>(this.url);
  }

  cadastrar(foto): Observable<Foto[]>{
    return this.conexaoApi.post<Foto[]>(this.url, foto);
  }

  editar(foto){
    return this.conexaoApi.put(this.url+foto._id, foto);
  }

  buscar(fotoId: string){
    return this.conexaoApi.get<Foto>(this.url + fotoId);
  }

  apagar(foto):Observable<Foto[]>{
    return this.conexaoApi.delete<Foto[]>(this.url + foto._id);
  }

}
