import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: ['./toolbar-navigation.component.scss']
})
export class ToolbarNavigationComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new(Subject);

  constructor(
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  ngOnInit(): void {

  }

  logout(): void {
    this.cookieService.delete('userToken')
    this.router.navigate(['/home'])
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
