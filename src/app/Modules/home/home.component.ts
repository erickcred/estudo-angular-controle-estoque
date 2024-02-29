import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Message, MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';
import { UserCadastroRequest } from 'src/app/Models/Interfaces/User/UserCadastroRequest';
import { UserCadastroResponse } from 'src/app/Models/Interfaces/User/UserCadastroResponse';
import { UserLoginRequest } from 'src/app/Models/Interfaces/User/auth/UserLoginRequest';
import { UserLoginResponse } from 'src/app/Models/Interfaces/User/auth/UserLoginResponse';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new(Subject)

  loginCard = true;

  formLogin = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  formCadastro = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmrPassword: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
  ) {

  }

  ngOnInit(): void {

  }

  fazerLogin(): void {
    if (this.formLogin.valid) {
      this.userService.login(this.formLogin.value as UserLoginRequest)
        .pipe( takeUntil(this.destroy$) )
        .subscribe({
          next: (response: UserLoginResponse) => {
            if (response) {
              this.cookieService.set('userToken', response?.token)
              this.formLogin.reset();
              this.messageService.add({
                severity: 'success',
                summary: `Sucesso`,
                closeIcon: 'pi-times',
                icon: 'pi-lock-open',
                detail: `Olá, seja bem vindo ${response.name}!`,
                life: 10000
              });
            }
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: `Warning`,
              closeIcon: 'pi-times',
              icon: 'pi-lock',
              detail: error.error.error,
              life: 10000
            });
            console.log(error)
          }
        })
    }
  }

  fazerCadastro() {
    if (this.formCadastro.valid) {
      if (this.formCadastro.value.password === this.formCadastro.value.confirmrPassword) {
        this.userService
          .cadastrarUsuario(this.formCadastro.value as UserCadastroRequest)
          .pipe( takeUntil(this.destroy$) )
          .subscribe({
            next: (response: UserCadastroResponse) => {
              if (response) {
                this.formCadastro.reset();
                this.loginCard = true;
                this.messageService.add({
                  severity: 'success',
                  summary: `Sucesso`,
                  closeIcon: 'pi-times',
                  icon: 'pi-lock-open',
                  detail: `Uasuário ${response.name} criado com sucesso!`,
                  life: 10000
                });
              }
            },
            error: (error: any) => {
              this.messageService.add({
                severity: 'error',
                summary: `Warning`,
                closeIcon: 'pi-times',
                icon: 'pi-lock',
                detail: error.error.error,
                life: 10000
              });
              if (error.error.error == 'Email already exists')
              console.log(error);
            }
          });
      } else {
        console.log("As senhas não conferem")
      }
    }
  }



  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
