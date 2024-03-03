import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, first, map } from 'rxjs';
import { GetAllProductResponse } from 'src/app/Models/Interfaces/product/response/GetAllProductResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutcService {

  private readonly apiUrl = environment.urlApi;
  private JWT_TOKEN = this.cookieService.get('userToken');
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.JWT_TOKEN}`
    })
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  listarProdutos(): Observable<Array<GetAllProductResponse>> {
    return this.http.get<Array<GetAllProductResponse>>(`${this.apiUrl}/products`, this.httpOptions)
    .pipe(
      first(),
      // map(product => product.filter(x => x.amount > 0))
    );
  }

  editarProduto(product: any): Observable<GetAllProductResponse> {
    return this.http.put<GetAllProductResponse>(`${this.apiUrl}/product/edit`, this.httpOptions)
      .pipe( first() )
  }

  deletarProduto(product: any): Observable<GetAllProductResponse> {
    return this.http.delete<GetAllProductResponse>(`${this.apiUrl}/product/edit`, this.httpOptions)
      .pipe( first() )
  }
}
