import { Injectable } from "@angular/core";
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductResponse } from "src/app/Models/Interfaces/product/response/GetAllProductResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductResponse> | null>(null);
  public productsDatas: Array<GetAllProductResponse> = [];

  setProductsDatas(products: Array<GetAllProductResponse>): void {
    this.productsDataEmitter$.next(products);
    this.getProductsDatas();
  }

  getProductsDatas() {
    this.productsDataEmitter$
      .pipe(
        take(1),
        // map(products => products?.filter(product => product.amount > 0)),
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsDatas = response;
          }
        }
      });
    return this.productsDatas;
  }
}
