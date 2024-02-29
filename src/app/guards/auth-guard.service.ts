import { Injectable } from '@angular/core';
import { UserService } from '../Services/user/user.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.userService.usuarioLogado()) {
      this.router.navigate(['/home']);
      return false;
    }

    this.userService.usuarioLogado();
    return true;
  }
}
