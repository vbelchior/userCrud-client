import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UsersResolver implements Resolve<UserEntity[]> {
  constructor(private userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserEntity[]> {
    const subject: Subject<UserEntity[]> = new Subject<UserEntity[]>();

    const fetchPromise: Promise<UserEntity[]> = this.userService
      .filter()
      .toPromise();
    Promise.all<UserEntity[]>([fetchPromise])
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
