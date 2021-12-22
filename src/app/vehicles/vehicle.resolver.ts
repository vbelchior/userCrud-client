import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { VehicleEntity } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@Injectable({ providedIn: 'root' })
export class VehicleResolver implements Resolve<VehicleEntity> {
  constructor(private vehicleService: VehicleService) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VehicleEntity> {
    const idPath: string = route.paramMap.get('id');
    if (idPath == 'new') return of(new VehicleEntity({}));

    const subject: Subject<VehicleEntity> = new Subject<VehicleEntity>();
    this.vehicleService
      .retrieve(Number(idPath))
      .toPromise()
      .then((vehicle: VehicleEntity) => {
        subject.next(new VehicleEntity(vehicle));
      })
      .catch(() => {
        subject.next(new VehicleEntity());
      })
      .finally(() => subject.complete());
    return subject.asObservable();
  }
}
