import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { UserEntity } from '../users/user.entity';
import { Token } from '@angular/compiler';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  public login(email: string, password: string): Observable<Token> {
    const path: string = `${environment.server}/login`;
    return this.httpClient.post<Token>(path, { email, password });
  }

  public retrieve(): Observable<Credential> {
    const path: string = `${environment.server}/credential`;
    return this.httpClient.get<Credential>(path);
  }

  public signup(entity: UserEntity): Observable<Token> {
    const path: string = `${environment.server}/signup`;
    return this.httpClient.post<Token>(path, entity);
  }

  public update(officeId: string): Observable<Token> {
    const path: string = `${environment.server}/credential`;
    return this.httpClient.put<Token>(path, { officeId });
  }

  public updatePassword(
    user: UserEntity,
    current: string,
    newPassword: string
  ) {
    const path: string = `${environment.server}/newpassword`;
    return this.httpClient.patch(path, {
      user: user,
      current: current,
      new: newPassword,
    });
  }

  public refresh(refreshToken: string, userId?: string): Observable<Token> {
    const path: string = `${environment.server}/refresh`;
    return this.httpClient.put<Token>(path, { refreshToken, userId });
  }

  public delete(): Observable<Object> {
    const path: string = `${environment.server}/credential`;
    return this.httpClient.delete(path);
  }
}
