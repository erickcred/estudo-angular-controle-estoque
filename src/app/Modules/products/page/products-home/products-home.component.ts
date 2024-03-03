import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductResponse } from 'src/app/Models/Interfaces/product/response/GetAllProductResponse';
import { ProductsDataTransferService } from 'src/app/Services/product/products-data-transfer.service';
import { ProdutcService } from 'src/app/Services/product/produtc.service';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: []
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new(Subject);

  productsList!: Array<GetAllProductResponse>

  constructor(
    private router: Router,
    private messageService: MessageService,
    private productService: ProdutcService,
    private produtcsDataTransferService: ProductsDataTransferService,
  ) {
    this.messageService.add({
      severity: 'success',
      summary: `Erro`,
      closeIcon: 'pi-times',
      icon: 'pi-lock',
      detail: 'Erro ao buscar produtos',
      life: 10000
    });
  }

  ngOnInit(): void {
    this.listaProdutosLoad();
    this.messageService.add({
      severity: 'success',
      summary: `Erro`,
      closeIcon: 'pi-times',
      icon: 'pi-lock',
      detail: 'Erro ao buscar produtos',
      life: 10000
    });
  }

  listaProdutosLoad() {
    const productsLoad = this.produtcsDataTransferService.getProductsDatas();

    if (productsLoad.length > 0) {
      this.productsList = productsLoad;
    }
    else {
      this.atualizaTabela();
    }
  }

  atualizaTabela() {
    console.log('Iniciando atualização da tabela')
    this.productService.listarProdutos()
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response: Array<GetAllProductResponse>) => {
          if (response.length > 0) {
            this.productsList = response;
            this.produtcsDataTransferService.setProductsDatas(this.productsList);
          }
        },
        error: (error: any) => {
          this.messageService.add({
            severity: 'error',
            summary: `Erro`,
            closeIcon: 'pi-times',
            icon: 'pi-lock',
            detail: 'Erro ao buscar produtos',
            life: 10000
          });
          console.log(error)
          this.router.navigate(['/dashboard'])
        }
      });
  }

  adicionaProduto() {
    console.log('Adicionar produto')
  }

  atualizaProduto(productId: any): void {
    console.log('Atualizando:');
    console.log(productId)
  }

  deletaProduto(productId: any): void {
    console.log('Deletando:');
    console.log(productId)
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
