import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductResponse } from 'src/app/Models/Interfaces/product/response/GetAllProductResponse';

@Component({
  selector: 'app-produtcts-table',
  templateUrl: './produtcts-table.component.html',
  styleUrls: []
})
export class ProdutctsTableComponent {

  @Input() productData: Array<GetAllProductResponse> = [];

  @Output() atualizarTabela = new EventEmitter<any>();
  @Output() adicionarProduto = new EventEmitter<any>();
  @Output() atualizarProduto = new EventEmitter<any>();
  @Output() deletarProduto = new EventEmitter<any>();

  productSelected!: GetAllProductResponse

  atualizaTabela() {
    this.atualizarTabela.emit()
  }

  adicionaProduto() {
    this.adicionarProduto.emit()
  }

  atualizaProduto(product: any) {
    this.atualizarProduto.emit(product)
  }

  deletaProduto(product: any) {
    this.deletarProduto.emit(product)
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
