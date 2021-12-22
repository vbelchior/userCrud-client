import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AddressEntity, ViaCep } from '@commons/entities/address';
import { HttpClient } from '@angular/common/http';
import { TypeUtil } from '@commons/utils';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from '@commons/entities/address/address.service';
import { Router } from '@angular/router';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `home`,
  template: `
    <div fxLayoutAlign="center center">
      <mat-card>
        <mat-card-title>Inicio</mat-card-title>
        <div
          fxFlex="100"
          fxLayout="column wrap"
          fxLayoutGap="0.5em"
          fxLayoutGap.lt-md="0"
          fxLayoutAlign="start center"
          class="grid-container"
        >
          <mat-card (click)="onNavigateUsers()" class="item">
            <mat-card-title>Cadastro</mat-card-title>
          </mat-card>
          <mat-card (click)="onNavigateVehicles()" class="item">
            <mat-card-title>Veiculos</mat-card-title>
          </mat-card>
          <mat-card class="item">
            <mat-card-title>Sinistro</mat-card-title>
          </mat-card>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        width: 45%;
      }

      mat-card.item {
        cursor: pointer;
      }

      .grid-container {
        margin-left: 8px;
        margin-right: 8px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  public userId: number;

  public addressId: number;

  public userGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  public ngOnInit() {}

  public onNavigateUsers(): void {
    this.router.navigate(['user']);
  }

  public onNavigateVehicles(): void {
    this.router.navigate(['vehicles']);
  }
}
