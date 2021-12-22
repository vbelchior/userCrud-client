import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { AddressEntity } from './address.entity';
import { environment } from '@environments/environment';
import { TypeUtil } from '@commons/utils';

@Injectable()
export class AddressService {
  constructor(private httpClient: HttpClient) {}

  public create(entity: AddressEntity): Observable<AddressEntity> {
    const path: string = `${environment.server}/addresses`;
    return this.httpClient.post<AddressEntity>(path, entity);
  }

  public retrieve(id: number): Observable<AddressEntity> {
    if (!TypeUtil.exists(id)) return of(new AddressEntity());
    const path: string = `${environment.server}/addresses/${id}`;
    return this.httpClient.get<AddressEntity>(path);
  }

  public update(id: number, entity: AddressEntity): Observable<Object> {
    const path: string = `${environment.server}/addresses/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.patch(path, entity, { params: query });
  }

  public replace(id: number, entity: AddressEntity): Observable<Object> {
    const path: string = `${environment.server}/addresses/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  }

  public delete(id: number): Observable<Object> {
    if (!TypeUtil.exists(id)) return throwError(new AddressEntity());
    const path: string = `${environment.server}/addresses/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.delete(path, { params: query });
  }
}
