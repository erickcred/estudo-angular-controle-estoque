import { CommonModule, CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { ToolbarNavigationComponent } from './components/toolbar-navigation/toolbar-navigation.component';
import { PrimeComponentsModule } from './prime-components.module';



@NgModule({
  declarations: [
    ToolbarNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,

    // PrimeNG
    PrimeComponentsModule,
  ],
  exports: [
    ToolbarNavigationComponent,
  ],
  providers: []
})
export class SharedModule { }
