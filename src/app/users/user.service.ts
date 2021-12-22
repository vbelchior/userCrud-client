import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserEntity } from './user.entity';
import { environment } from '@environments/environment';
import { TypeUtil } from '@commons/utils';

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public create(entity: UserEntity): Observable<UserEntity> {
    const path: string = `${environment.server}/users`;
    return this.httpClient.post<UserEntity>(path, entity);
  }

  public retrieve(id: number): Observable<UserEntity> {
    if (!TypeUtil.exists(id)) return of(new UserEntity());
    const path: string = `${environment.server}/users/${id}`;
    return this.httpClient.get<UserEntity>(path);
  }

  public update(id: number, entity: UserEntity): Observable<Object> {
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.patch(path, entity, { params: query });
  }

  public replace(id: number, entity: UserEntity): Observable<Object> {
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  }

  public delete(id: number): Observable<Object> {
    if (!TypeUtil.exists(id)) return throwError(new UserEntity());
    const path: string = `${environment.server}/users/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.delete(path, { params: query });
  }

  public filter(
    nameLike?: string,
    titleLike?: string,
    offset?: number,
    limit?: number
  ): Observable<UserEntity[]> {
    const path: string = `${environment.server}/users`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.hasText(nameLike)) query = query.set('nameLike', nameLike);
    if (TypeUtil.hasText(titleLike)) query = query.set('titleLike', titleLike);
    if (TypeUtil.exists(offset)) query = query.set('offset', String(offset));
    if (TypeUtil.exists(limit)) query = query.set('limit', String(limit));
    return this.httpClient.get<UserEntity[]>(path, { params: query });
  }

  public count(nameLike?: string, titleLike?: string): Observable<number> {
    const path: string = `${environment.server}/users/count/value`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.hasText(nameLike)) query = query.set('nameLike', nameLike);
    if (TypeUtil.hasText(titleLike)) query = query.set('titleLike', titleLike);
    return this.httpClient.get<number>(path, { params: query });
  }
}
