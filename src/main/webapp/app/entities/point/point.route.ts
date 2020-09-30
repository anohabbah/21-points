import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPoint, Point } from 'app/shared/model/point.model';
import { PointService } from './point.service';
import { PointComponent } from './point.component';
import { PointDetailComponent } from './point-detail.component';
import { PointUpdateComponent } from './point-update.component';

@Injectable({ providedIn: 'root' })
export class PointResolve implements Resolve<IPoint> {
  constructor(private service: PointService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPoint> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((point: HttpResponse<Point>) => {
          if (point.body) {
            return of(point.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Point());
  }
}

export const pointRoute: Routes = [
  {
    path: '',
    component: PointComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.point.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PointDetailComponent,
    resolve: {
      point: PointResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.point.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PointUpdateComponent,
    resolve: {
      point: PointResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.point.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PointUpdateComponent,
    resolve: {
      point: PointResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.point.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
