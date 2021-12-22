import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularUtil } from '@commons/utils';

@Component({
  selector: 'login',
  template: `
    <div fxLayout="row" fxLayoutAlign="center center">
      <mat-card fxFlex="40" fxFlex.lt-md="90">
        <mat-card-title>
          <h4>Login do Segurado</h4>
        </mat-card-title>
        <mat-card-content fxLayout="row wrap" [formGroup]="formGroup">
          <span>Insira seu email e senha:</span>
          <div fxLayout="row" fxFlex="100">
            <mat-form-field fxFlex="100">
              <input
                matInput
                formControlName="email"
                placeholder="E-mail"
                required
              />
            </mat-form-field>
          </div>
          <div fxLayout="row" fxFlex="100">
            <mat-form-field fxFlex="100">
              <input
                matInput
                formControlName="secret"
                type="password"
                placeholder="Senha"
                required
              />
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions fxLayout="row" fxLayoutAlign="space-between">
          <button mat-button>Registrar</button>
          <!-- <button mat-button color="accent" >Esqueci a senha</button> -->
          <button mat-button color="primary">
            <span>Login</span>
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        background: rgba(255, 255, 255, 0.9);
        margin-bottom: 1em;
        margin-top: 1em;
      }
      mat-card-actions[override] {
        max-width: none;
      }
      .footer {
        background-color: rgba(32, 32, 32, 0.1);
        bottom: 0px;
        /* color: #BCBCBC; */
        font-size: 0.75em;
        position: fixed;
        width: 100%;
      }
      .footer > div {
        padding: 8px 16px;
      }
      a {
        /* color: #EDEDED; */
        text-decoration: none;
      }
      a:hover {
        color: #5d8bc1;
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      secret: ['', Validators.required],
    });
  }

  public ngOnInit(): void {}
}
