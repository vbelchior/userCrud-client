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
            <h2>Veículo</h2>
          </div>
          <button
            *ngIf="vehicle.id"
            mat-stroked-button
            color="warn"
            (click)="onDeleteVehicle(vehicle.id)"
          >
            DELETAR
          </button>
        </div>
        <form [formGroup]="vehicleGroup" fxLayout="column">
          <ng-template matStepLabel>Informações pessoais</ng-template>
          <div class="modelAndYear">
            <mat-form-field appearance="outline" fxFlex="49">
              <mat-label>Modelo</mat-label>
              <input matInput formControlName="model" required />
              <mat-error *ngIf="vehicleGroup.get('model').errors?.required"
                >Modelo <strong>é necessário</strong>
              </mat-error>
            </mat-form-field>
            <mat-form-field appearance="outline" class="year" fxFlex="49">
              <mat-label>Ano</mat-label>
              <input matInput formControlName="year" mask="0000" />
              <mat-error *ngIf="vehicleGroup.get('year').errors?.required"
                >Ano <strong>é necessário</strong>
              </mat-error>
            </mat-form-field>
          </div>
          <div class="licensePlateAndManufacturer">
            <mat-form-field
              appearance="outline"
              class="licensePlate"
              fxFlex="49"
            >
              <mat-label>Placa</mat-label>
              <input matInput formControlName="licensePlate" />
              <mat-error
                *ngIf="vehicleGroup.get('licensePlate').errors?.required"
                >Placa <strong>é necessário</strong>
              </mat-error>
            </mat-form-field>
            <mat-form-field
              appearance="outline"
              class="manufacturer"
              fxFlex="49"
            >
              <mat-label>Fabricante</mat-label>
              <input matInput formControlName="manufacturer" />
              <mat-error *ngIf="vehicleGroup.get('year').errors?.required"
                >Fabricante <strong>é necessário</strong>
              </mat-error>
            </mat-form-field>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        width: 45%;
      }
      div.modelAndYear {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
      div.licensePlateAndManufacturer {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
    `,
  ],
})
export class VehicleComponent implements OnInit {
  public vehicle: VehicleEntity;

  public vehicleGroup: FormGroup;

  constructor(
    public activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private location: Location,
    private vehicleService: VehicleService
  ) {
    this.vehicleGroup = this.formBuilder.group({
      model: ['', Validators.required],
      year: ['', Validators.required],
      licensePlate: ['', Validators.required],
      manufacturer: ['', Validators.required],
      userId: [''],
    });
  }

  public ngOnInit(): void {
    this.vehicle = new VehicleEntity(this.activatedRoute.snapshot.data.vehicle);

    this.vehicleGroup.setValue({
      model: this.vehicle.model || '',
      year: this.vehicle.year || '',
      licensePlate: this.vehicle.licensePlate || '',
      manufacturer: this.vehicle.manufacturer || '',
      userId: this.vehicle.userId || '',
    });
    this.vehicleGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((group) => {
          return {
            model: group.model,
            year: group.year,
            licensePlate: group.licensePlate,
            manufacturer: group.manufacturer,
            userId: group.userId,
          };
        })
      )
      .subscribe((json: object) => {
        if (this.vehicleGroup.valid) {
          this.saveVehicle(json);
        }
      });
  }

  private async saveVehicle(partial: any): Promise<void> {
    partial['userId'] = 0;
    const save$: Observable<any> = this.vehicle.id
      ? this.vehicleService.update(this.vehicle.id, new VehicleEntity(partial))
      : this.vehicleService.create(new VehicleEntity(partial));
    return save$
      .toPromise()
      .then((vehicle: VehicleEntity) => {
        if (TypeUtil.exists(vehicle.id)) {
          this.vehicle.id = vehicle.id;
        }
        this.snackBar.open('Veiculo Salvo', null);

        return Promise.resolve();
      })
      .catch((error) => {
        this.snackBar.open(error.error.message, null);
      });
  }

  public onBackRoute() {
    this.location.back();
  }

  public onDeleteVehicle(id) {
    this.vehicleService.delete(id).subscribe((result) => {
      if (result) this.router.navigate(['vehicles']);
    });
  }
}
