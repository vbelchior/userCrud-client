import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { VehicleEntity } from './vehicle.entity';
import { VehicleService } from './vehicle.service';

@Injectable({ providedIn: 'root' })
export class VehiclesResolver implements Resolve<VehicleEntity[]> {
  constructor(private vehicleService: VehicleService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<VehicleEntity[]> {
    const subject: Subject<VehicleEntity[]> = new Subject<VehicleEntity[]>();

    const fetchPromise: Promise<VehicleEntity[]> = this.vehicleService
      .filter()
      .toPromise();
    Promise.all<VehicleEntity[]>([fetchPromise])
      .then(([fetch]) => {
        subject.next(fetch);
      })
      .catch(() => {
        subject.next([]);
      })
      .finally(() => subject.complete());
    return subject.asObservable();
  }
}
