import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardHomeComponent } from './page/dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { DASHBOARD_ROUTES } from './dashboard.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartModule } from 'primeng/chart';
import { PrimeComponentsModule } from 'src/app/shared/prime-components.module';
import { CookieService } from 'ngx-cookie-service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';



@NgModule({
  declarations: [
    DashboardHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(DASHBOARD_ROUTES),

    ChartModule,

    // Prime
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
export class DashboardModule { }
