import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { DeleteProductResponse } from 'src/app/Models/Interfaces/product/response/DeleteProductResponse';
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
    private confirmationService: ConfirmationService,
    private produtcsDataTransferService: ProductsDataTransferService,
  ) {}

  ngOnInit(): void {
    this.listaProdutosLoad();
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
    console.log('Adicionar produto');
  }

  atualizaProduto(product: any): void {
    console.log('Atualizando:');
    console.log(product);
  }

  deletaProduto(product: any): void {

    if (product) {
      this.confirmationService.confirm({
        message: `Confirma a exclusão do produto: ${product.name}?`,
        header: 'Confirmação de exclusão!',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        acceptButtonStyleClass: 'p-button-danger',
        rejectLabel: 'Não',
        rejectButtonStyleClass: 'p-button-success',
        accept: () => {
          this.productService.deletarProduto(product)
            .pipe( takeUntil(this.destroy$) )
            .subscribe({
              next: (response: DeleteProductResponse) => {
                this.messageService.add({
                  severity: 'success',
                  summary: `Success`,
                  closeIcon: 'pi-times',
                  icon: 'pi-lock-open',
                  detail: `Produto:\n ${response.name} deletado com sucesso!`,
                  life: 4000
                });
                this.atualizaTabela();
              },
              error: (error: any) => {
                console.log(error)
                this.messageService.add({
                  severity: 'error',
                  summary: `Warning`,
                  closeIcon: 'pi-times',
                  icon: 'pi-lock',
                  detail: error.error.error,
                  life: 10000
                });
              }
            });
        }
      })

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
