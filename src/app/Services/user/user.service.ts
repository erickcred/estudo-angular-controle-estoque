import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { UserCadastroRequest } from 'src/app/Models/Interfaces/User/UserCadastroRequest';
import { UserCadastroResponse } from 'src/app/Models/Interfaces/User/UserCadastroResponse';
import { UserLoginRequest } from 'src/app/Models/Interfaces/User/auth/UserLoginRequest';
import { UserLoginResponse } from 'src/app/Models/Interfaces/User/auth/UserLoginResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.urlApi;

  constructor(private http: HttpClient) { }

  login(userLogin: UserLoginRequest): Observable<UserLoginResponse> {
    return this.http.post<UserLoginResponse>(`${this.apiUrl}/auth`, userLogin).pipe(
      first()
    );
  }

  cadastrarUsuario(userCad: UserCadastroRequest): Observable<UserCadastroResponse> {
    return this.http.post<UserCadastroResponse>(`${this.apiUrl}/user`, userCad).pipe(
      first()
    );
  }
}
