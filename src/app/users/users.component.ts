import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TypeUtil } from '@commons/utils';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: `user`,
  template: `
    <div fxLayoutAlign="center center">
      <mat-card fxFlex="48" class="mat-elevation-z4">
        <div fxLayout="row" fxLayoutAlign="space-between center">
          <h2>Usuários</h2>
          <div
            fxLayout="row"
            fxLayoutAlign="space-between baseline"
            fxLayoutGap="16px"
          >
            <mat-form-field appearance="outline" class="small">
              <input
                matInput
                placeholder="Filtrar pelo nome"
                [formControl]="filterName"
              />
            </mat-form-field>
            <button
              mat-stroked-button
              color="primary"
              (click)="onNavigateUser('new')"
            >
              INCLUIR
            </button>
          </div>
        </div>
        <mat-selection-list
          *ngIf="usersExists; else elseBlock"
          [multiple]="false"
        >
          <mat-list-option
            *ngFor="let user of users"
            (click)="onNavigateUser(user.id)"
            [value]="user.id"
          >
            <mat-icon matListIcon>account_circle</mat-icon>
            <div mat-line>{{ user.name }}</div>
            <div mat-line class="email">{{ user.email }}</div>
          </mat-list-option>
        </mat-selection-list>
        <ng-template #elseBlock>
          <div fxLayoutAlign="center">
            <span class="warn-color">Nenhum usuário adicionado.</span>
          </div>
        </ng-template>
      </mat-card>
    </div>
  `,
  styles: [
    `
      mat-card {
        margin-bottom: 1em;
        margin-top: 1em;
      }
      .header {
        margin-bottom: 1em;
      }
      .email {
        color: gray;
      }
      .mat-list-option {
        border-top: solid 0.2px grey;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  public users: UserEntity[];

  public filterName: FormControl;

  constructor(
    public activatedRoute: ActivatedRoute,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    private location: Location,
    private router: Router,
    private userService: UserService
  ) {
    this.users = [];
    this.filterName = new FormControl('');
  }
  public fetchPage(keepIndex?: boolean) {
    const fetchPromise: Promise<UserEntity[]> = this.userService
      .filter()
      .toPromise();
    Promise.all<UserEntity[]>([fetchPromise])
      .then(([fetch]) => {
        this.users = fetch;
      })
      .catch(() => {
        this.snackBar.open(
          'Algo inesperado ocorreu! Verifique sua conexão.',
          null
        );
      });
  }

  public ngOnInit() {
    this.users = this.activatedRoute.snapshot.data.users;
    this.filterName.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(() => this.fetchUsers());
  }

  public async fetchUsers() {
    const nameLike: string = this.filterName.value;
    this.users = await this.userService.filter(nameLike).toPromise();
  }

  public onBackRoute() {
    this.location.back();
  }

  public onNavigateUser(id) {
    this.router.navigate(['users', id]);
  }

  public get usersExists() {
    return TypeUtil.isFullArray(this.users);
  }
}
