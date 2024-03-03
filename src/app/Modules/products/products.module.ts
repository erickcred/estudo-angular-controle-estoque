import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PrimeComponentsModule } from 'src/app/shared/prime-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProductsHomeComponent } from './page/products-home/products-home.component';
import { PRODUCTS_ROUTES } from './products.routing';
import { ProdutctsTableComponent } from './components/produtcts-table/produtcts-table.component';



@NgModule({
  declarations: [
    ProductsHomeComponent,
    ProdutctsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(PRODUCTS_ROUTES),

    SharedModule,

    // PrimeNG
    PrimeComponentsModule,

  ],
  providers: [
    MessageService,
    CookieService,
    ConfirmationService,
    DialogService,
    CurrencyPipe,
  ]
})
export class ProductsModule { }
