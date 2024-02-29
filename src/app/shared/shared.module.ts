import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar'



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule,
    SidebarModule,
    ToolbarModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    CardModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    InputMaskModule,
    ToastModule,
    SidebarModule,
    ToolbarModule,
  ],
  providers: [
    MessageService,
    CookieService,
  ]
})
export class SharedModule { }
