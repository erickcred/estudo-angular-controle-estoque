import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { GetAllProductResponse } from 'src/app/Models/Interfaces/product/response/GetAllProductResponse';
import { ProductsDataTransferService } from 'src/app/Services/product/products-data-transfer.service';
import { ProdutcService } from 'src/app/Services/product/produtc.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new(Subject);

  products: Array<GetAllProductResponse> = []
  options: any

  productsChartData!: ChartData
  productsChartOptions!: ChartOptions

  constructor(
    private productService: ProdutcService,
    private messageService: MessageService,
    private productsDataTransferService: ProductsDataTransferService,
  ) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos(): void {
    this.productService.listarProdutos()
      .pipe( takeUntil(this.destroy$) )
      .subscribe({
        next: (response) => {
          if (response.length > 0) {
            this.products = response;
            this.productsDataTransferService.setProductsDatas(this.products);
            this.setProductsCharConfig();
          }
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: `Error`,
            closeIcon: 'pi-times',
            icon: 'pi-exclamation-triangle',
            detail: `Olá, seja bem vindo ${error}!`,
            life: 10000
          });
        }
      })
  }

  setProductsCharConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

    this.products.forEach(product => {
      this.productsChartData = {
        labels: this.products.map(product => product.name),
        datasets: [{
          label: 'Quantidade',
          backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-200'),
          borderColor: documentStyle.getPropertyValue('--indigo-400'),
          data: this.products.map(product => product?.amount)
        }]
      };
    })

    this.productsChartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 'bold'
            }
          },
          grid: {
            color: surfaceBorder
          }
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder
          }
        }
      },
    }
  }

  atualizaTabela() {
    this.listarProdutos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
