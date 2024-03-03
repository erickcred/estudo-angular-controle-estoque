import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductResponse } from 'src/app/Models/Interfaces/product/response/GetAllProductResponse';

@Component({
  selector: 'app-produtcts-table',
  templateUrl: './produtcts-table.component.html',
  styleUrls: []
})
export class ProdutctsTableComponent {

  @Input() productData: Array<GetAllProductResponse> = [];
  @Output() atualizarLista = new EventEmitter<any>();

  productSelected!: GetAllProductResponse

  listaProdutos() {
    this.atualizarLista.emit()
  }

  getSeverity(status: number): any {
    if (status == 0)
      return 'danger'
    if (status >= 10)
      return 'success'
    if (status < 10)
      return 'warning'
  }

  selectProduct(productSelect: GetAllProductResponse) {

  }

}
