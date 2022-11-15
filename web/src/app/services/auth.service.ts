import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private httpClient: HttpClient) { }

    login(email: string, password: string): Observable<any> {
        return this.httpClient.post(
            AUTH_API + 'login',
            {
                email, 
                senha: password
            },
            httpOptions
        );
    }

    register(username: string, email: string, password: string): Observable<any> {
        return this.httpClient.post(
          AUTH_API + 'register',
          {
            nome: username,
            email,
            senha: password,
          },
          httpOptions
        );
      }

      logout(): Observable<any> {
        return this.httpClient.post(AUTH_API + 'logout', { }, httpOptions);
      }

}