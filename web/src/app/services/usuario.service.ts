import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  url = environment.BASE_URL + 'usuarios'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }


// Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem um carro pelo id
  getUsuarioById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

   // Obtem todos os carros
  getUsuario(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }



  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}