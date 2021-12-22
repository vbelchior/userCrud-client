import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { VehicleEntity } from './vehicle.entity';
import { environment } from '@environments/environment';
import { TypeUtil } from '@commons/utils';

@Injectable()
export class VehicleService {
  constructor(private httpClient: HttpClient) {}

  public create(entity: VehicleEntity): Observable<VehicleEntity> {
    const path: string = `${environment.server}/vehicles`;
    return this.httpClient.post<VehicleEntity>(path, entity);
  }

  public retrieve(id: number): Observable<VehicleEntity> {
    if (!TypeUtil.exists(id)) return of(new VehicleEntity());
    const path: string = `${environment.server}/vehicles/${id}`;
    return this.httpClient.get<VehicleEntity>(path);
  }

  public update(id: number, entity: VehicleEntity): Observable<Object> {
    const path: string = `${environment.server}/vehicles/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.patch(path, entity, { params: query });
  }

  public replace(id: number, entity: VehicleEntity): Observable<Object> {
    const path: string = `${environment.server}/vehicles/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.put(path, entity, { params: query });
  }

  public delete(id: number): Observable<Object> {
    if (!TypeUtil.exists(id)) return throwError(new VehicleEntity());
    const path: string = `${environment.server}/vehicles/${id}`;
    let query: HttpParams = new HttpParams();
    return this.httpClient.delete(path, { params: query });
  }

  public filter(
    nameLike?: string,
    offset?: number,
    limit?: number
  ): Observable<VehicleEntity[]> {
    const path: string = `${environment.server}/vehicles`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.hasText(nameLike)) query = query.set('nameLike', nameLike);
    if (TypeUtil.exists(offset)) query = query.set('offset', String(offset));
    if (TypeUtil.exists(limit)) query = query.set('limit', String(limit));
    return this.httpClient.get<VehicleEntity[]>(path, { params: query });
  }

  public count(nameLike?: string): Observable<number> {
    const path: string = `${environment.server}/vehicles/count/value`;
    let query: HttpParams = new HttpParams();
    if (TypeUtil.hasText(nameLike)) query = query.set('nameLike', nameLike);
    return this.httpClient.get<number>(path, { params: query });
  }
}
