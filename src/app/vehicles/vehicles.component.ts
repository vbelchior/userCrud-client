import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AddressEntity, ViaCep } from '@commons/entities/address';
import { HttpClient } from '@angular/common/http';
import { TypeUtil } from '@commons/utils';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from './vehicle.service';
import { VehicleEntity } from './vehicle.entity';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `vehicle`,
  template: `
    <div fxLayoutAlign="center center">
      <mat-card>
        <div
          fxLayout="row"
          fxLayoutAlign="space-between center"
          class="header-list"
        >
          <div fxLayout="row" fxLayoutAlign="start baseline" class="header">
            <button mat-icon-button (click)="onBackRoute()" aria-label="Voltar">
              <mat-icon class="material-icons-outlined"
                >arrow_backward</mat-icon
              >
            </button>
            <h2>Veículos</h2>
          </div>
          <button
            mat-stroked-button
            color="primary"
            (click)="onNavigateVehicle('new')"
          >
            INCLUIR
          </button>
        </div>
        <mat-selection-list
          *ngIf="vehiclesExists; else elseBlock"
          [multiple]="false"
        >
          <mat-list-option
            *ngFor="let vehicle of vehicles"
            (click)="onNavigateVehicle(vehicle.id)"
            [value]="vehicle.id"
          >
            {{ vehicle.model }}
          </mat-list-option>
        </mat-selection-list>
        <ng-template #elseBlock>
          <div fxLayoutAlign="center">
            <span class="warn-color">Nenhum veículo adicionado.</span>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        width: 45%;
      }
    `,
  ],
})
export class VehiclesComponent implements OnInit {
  public vehicles: VehicleEntity[];

  constructor(
    public activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private vehicleService: VehicleService
  ) {
    this.vehicles = [];
  }
  public fetchPage(keepIndex?: boolean) {
    const fetchPromise: Promise<VehicleEntity[]> = this.vehicleService
      .filter()
      .toPromise();
    Promise.all<VehicleEntity[]>([fetchPromise])
      .then(([fetch]) => {
        this.vehicles = fetch;
      })
      .catch(() => {
        this.snackBar.open(
          'Algo inesperado ocorreu! Verifique sua conexão.',
          null
        );
      });
  }

  public ngOnInit() {
    this.vehicles = this.activatedRoute.snapshot.data.vehicles;
  }

  public onBackRoute() {
    this.location.back();
  }

  public onNavigateVehicle(id) {
    this.router.navigate(['vehicles', id]);
  }

  public get vehiclesExists() {
    return TypeUtil.isFullArray(this.vehicles);
  }
}
