import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new(Subject)

  loginCard = true;

  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    senha: ['', Validators.required]
  });

  formCadastro = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
    confirmarSenha: ['', Validators.required]
  })

  constructor(private formBuilder: FormBuilder) {

  }

  fazerLogin(): void {
    console.log('Realizando login')
    console.log(this.loginForm.value)
  }

  fazerCadastro() {
    console.log(this.formCadastro.value)
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
