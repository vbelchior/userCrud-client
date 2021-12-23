import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  ignoreElements,
  map,
} from 'rxjs/operators';
import { AddressEntity, ViaCep } from '@commons/entities/address';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TypeUtil } from '@commons/utils';

import { AddressService } from '@commons/entities/address/address.service';
import { CpfValidator } from '@commons/validator';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `user`,
  template: `
    <div fxLayoutAlign="center center">
      <mat-card class="mat-elevation-z4">
        <div fxLayout="row" fxLayoutAlign="space-between" class="header">
          <div fxLayout="row" fxLayoutAlign="start center">
            <button mat-icon-button (click)="onBackRoute()" aria-label="Voltar">
              <mat-icon class="material-icons-outlined "
                >arrow_backward</mat-icon
              >
            </button>
            <h2>Usuário</h2>
          </div>
          <button
            mat-stroked-button
            color="warn"
            *ngIf="userExists"
            (click)="onDeleteUser()"
          >
            EXCLUIR
          </button>
        </div>
        <mat-stepper orientation="vertical" #stepper>
          <mat-step [stepControl]="userGroup">
            <form [formGroup]="userGroup" fxLayout="column">
              <ng-template matStepLabel> Informações pessoais</ng-template>
              <mat-form-field appearance="outline" fxFlex="80">
                <mat-label>Nome</mat-label>
                <input matInput formControlName="name" required />
                <mat-error *ngIf="userGroup.get('name').errors?.required"
                  >Nome <strong>é necessário</strong>
                </mat-error>
                <mat-error *ngIf="userGroup.get('name').errors?.pattern"
                  >Nome <strong>inválido!</strong>
                </mat-error>
              </mat-form-field>
              <div class="emailAndPhone">
                <mat-form-field appearance="outline" class="email">
                  <mat-label>E-mail</mat-label>
                  <input matInput type="email" formControlName="email" />
                  <mat-error *ngIf="userGroup.get('email').errors?.required"
                    >Email <strong>é necessário</strong>
                  </mat-error>
                  <mat-error *ngIf="userGroup.get('email').errors?.email"
                    >Email <strong>inválido</strong>
                  </mat-error>
                </mat-form-field>
                <mat-form-field appearance="outline" class="phone">
                  <mat-label>Celular</mat-label>
                  <input
                    matInput
                    formControlName="phone"
                    mask="(00) 0000-0000||(00) 0 0000-0000"
                  />
                  <mat-error *ngIf="userGroup.get('phone').errors?.required"
                    >Celular <strong>é necessário</strong>
                  </mat-error>
                </mat-form-field>
              </div>
              <mat-form-field appearance="outline" class="cpf">
                <mat-label>CPF</mat-label>
                <input matInput formControlName="cpf" mask="000.000.000-00" />
                <mat-error *ngIf="userGroup.get('cpf').errors?.required"
                  >Cpf <strong>é necessário</strong>
                </mat-error>
                <mat-error *ngIf="userGroup.get('cpf').errors?.verifyCpf"
                  >Cpf <strong>inválido!</strong>
                </mat-error>
              </mat-form-field>
            </form>
          </mat-step>
          <mat-step [stepControl]="addressGroup">
            <form fxLayout="column" [formGroup]="addressGroup">
              <ng-template matStepLabel>Endereço</ng-template>
              <div
                fxFlex="100%"
                fxLayout="row"
                fxLayoutAlign="start center"
                fxLayoutGap="16px"
              >
                <mat-form-field fxFlex="20%" appearance="outline">
                  <mat-label>CEP</mat-label>
                  <input matInput formControlName="code" mask="00000-000" />
                </mat-form-field>
                <mat-form-field fxFlex="40%" appearance="outline">
                  <mat-label>Rua</mat-label>
                  <input matInput formControlName="street" />
                </mat-form-field>
                <mat-form-field fxFlex="20%" appearance="outline">
                  <mat-label>Número</mat-label>
                  <input #number matInput formControlName="number" />
                </mat-form-field>
                <mat-form-field fxFlex="20%" appearance="outline">
                  <mat-label>Complemento</mat-label>
                  <input matInput formControlName="extra" />
                </mat-form-field>
              </div>
              <div
                fxFlex="100%"
                fxLayout="row"
                fxLayoutAlign="start center"
                fxLayoutGap="16px"
              >
                <mat-form-field fxFlex="30%" appearance="outline">
                  <mat-label>Bairro</mat-label>
                  <input matInput formControlName="quarter" />
                </mat-form-field>
                <mat-form-field fxFlex="30%" appearance="outline">
                  <mat-label>Cidade </mat-label>
                  <input matInput formControlName="city" />
                </mat-form-field>
                <mat-form-field fxFlex="20%" appearance="outline">
                  <mat-label>Estado</mat-label>
                  <mat-select formControlName="state">
                    <mat-option *ngFor="let state of states" [value]="state">{{
                      state
                    }}</mat-option>
                  </mat-select>
                </mat-form-field>
                <mat-form-field fxFlex="20%" appearance="outline">
                  <mat-label>País</mat-label>
                  <input matInput formControlName="country" />
                </mat-form-field>
              </div>
            </form>
          </mat-step>
          <mat-step [stepControl]="secretGroup">
            <form [formGroup]="secretGroup">
              <ng-template matStepLabel>Senha</ng-template>
              <div class="secret-container">
                <mat-form-field appearance="outline" class="secret-item">
                  <input
                    matInput
                    formControlName="secret"
                    placeholder="Senha"
                    required
                  />
                </mat-form-field>
                <mat-form-field
                  appearance="outline"
                  *ngIf="!userExists"
                  class="secret-item confirmation"
                >
                  <input
                    matInput
                    formControlName="secretConfirmation"
                    placeholder="Confirmação"
                    required
                  />
                </mat-form-field>
              </div>
            </form>
          </mat-step>
        </mat-stepper>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        width: 48%;
      }

      .userGroup {
        display: flex;
        flex-flow: column nowrap;
      }
      div.emailAndPhone {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
      .email {
        flex: 0 0 50%;
      }
      .phone {
        flex: 0 0 45%;
      }
      .cpf {
        flex: 0 0 45%;
      }
      .header {
        margin-bottom: 1em;
      }
      .secret-container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
      }
      .secret-item {
        margin-right: 8px;
        flex: 1 0 48%;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  public userEntity: UserEntity;

  public addressEntity: AddressEntity;

  public userGroup: FormGroup;

  public addressGroup: FormGroup;

  public secretGroup: FormGroup;

  public states: Array<string>;

  constructor(
    public activatedRoute: ActivatedRoute,
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private location: Location,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.userGroup = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*'),
        ],
      ],
      phone: ['', (Validators.pattern('[- +()0-9]+'), Validators.required)],
      email: ['', [Validators.email]],
      cpf: [
        '',
        [
          Validators.pattern('[- +()0-9]+'),
          CpfValidator.verifyCpf,
          Validators.required,
        ],
      ],
      secret: [''],
      address: [''],
    });

    this.addressGroup = this.formBuilder.group({
      code: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', [Validators.required]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['Brasil'],
      quarter: [''],
      extra: [''],
    });

    this.secretGroup = this.formBuilder.group({
      secret: ['', Validators.required],
      secretConfirmation: ['', Validators.required],
    });

    this.states = AddressEntity.states;
  }

  private configFormGroups(): void {
    let cpf: string = TypeUtil.isFullString(this.userEntity.extra['CPF'])
      ? this.userEntity.extra['CPF']
      : null;

    this.userGroup.setValue({
      name: this.userEntity.name || '',
      phone: this.userEntity.phone || '',
      email: this.userEntity.email || '',
      cpf: cpf || '',
      secret: this.userEntity.secret || '',
      address: this.addressEntity || '',
    });

    this.addressGroup.setValue({
      code: this.addressEntity.code || '',
      street: this.addressEntity.street || '',
      number: this.addressEntity.number || '',
      city: this.addressEntity.city || '',
      state: this.addressEntity.state || '',
      country: this.addressEntity.country || '',
      quarter: this.addressEntity.quarter || '',
      extra: this.addressEntity.extra || '',
    });

    this.secretGroup.setValue({
      secret: this.userEntity.secret || '',
      secretConfirmation: this.userEntity.secret || '',
    });
    this.userGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((group) => {
          return {
            name: group.name,
            phone: group.phone,
            email: group.email,
            extra: { CPF: group.cpf },
            address: group.address,
            secret: group.secret,
          };
        })
      )
      .subscribe((json: object) => {
        if (
          this.userGroup.valid &&
          this.secretGroup.valid &&
          TypeUtil.hasText(this.addressEntity.id)
        ) {
          this.saveUser(json);
        }
      });
    this.addressGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(
          (prev, curr) =>
            prev.code === curr.code &&
            prev.street === curr.street &&
            prev.city === curr.city &&
            prev.state === curr.state &&
            prev.country === curr.country &&
            prev.number === curr.number &&
            prev.quarter === curr.quarter &&
            prev.extra === curr.extra
        ),
        map((group) => {
          return {
            code: group.code,
            street: group.street,
            number: group.number,
            city: group.city,
            state: group.state,
            country: group.country,
            quarter: group.quarter,
            extra: group.extra,
          };
        })
      )
      .subscribe((json: object) => {
        const code: string = json['code'];
        if (code.length == 8) this.searchByCep(json['code']);
        if (this.addressGroup.valid) this.saveAddress(json);
      });

    this.secretGroup.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        map((group) => {
          return {
            secret: group.secret,
            secretConfirmation: group.secretConfirmation,
          };
        })
      )
      .subscribe((json: object) => {
        if (json['secret'] !== json['secretConfirmation']) {
          this.snackBar.open('Senha errada', null);
        } else {
          this.userGroup.patchValue({ secret: json['secret'] });
        }
      });

    if (TypeUtil.hasText(this.userEntity.secret)) {
      this.secretGroup.get('secretConfirmation').disable();
      this.secretGroup.get('secret').disable();
    }
  }

  public ngOnInit() {
    this.userEntity = new UserEntity(this.activatedRoute.snapshot.data.user);
    this.addressEntity = new AddressEntity(this.userEntity.address);
    this.configFormGroups();
  }
  private async saveAddress(partial: any): Promise<void> {
    const save$: Observable<any> = this.addressEntity.id
      ? this.addressService.update(
          this.addressEntity.id,
          new AddressEntity(partial)
        )
      : this.addressService.create(new AddressEntity(partial));
    return save$
      .toPromise()
      .then((address: AddressEntity) => {
        if (TypeUtil.exists(address.id)) {
          this.addressEntity.id = address.id;
          this.userGroup.patchValue({ address: address });
        }
        return Promise.resolve();
      })
      .catch((error) => {
        this.snackBar.open(error);
      });
  }

  private async saveUser(partial: any): Promise<void> {
    console.debug(partial);
    const save$: Observable<any> = this.userEntity.id
      ? this.userService.update(this.userEntity.id, new UserEntity(partial))
      : this.userService.create(new UserEntity(partial));
    return save$
      .toPromise()
      .then((user: UserEntity) => {
        if (TypeUtil.exists(user.id)) {
          this.userEntity.id = user.id;
        }
        this.snackBar.open('Usuário Salvo', null);

        return Promise.resolve();
      })
      .catch((error) => {
        this.snackBar.open(error.error.message, null);
      });
  }

  public onDeleteUser(): void {
    this.userService
      .delete(this.userEntity.id)
      .toPromise()
      .then(() => {
        this.snackBar.open('Usuário excluído!', null);
        this.location.back();
      })
      .catch((error) => {
        this.snackBar.open(error.error.message, null);
      });
  }

  public onBackRoute() {
    this.location.back();
  }

  private searchByCep(code: string): void {
    this.addressService.searchByCep(code).subscribe((json: ViaCep) => {
      this.addressGroup.patchValue({
        street: json.logradouro,
        quarter: json.bairro,
        city: json.localidade,
        state: json.uf,
      });
    });
  }

  public get userExists() {
    if (this.userEntity.id > 0) return true;
    return;
  }
}
