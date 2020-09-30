import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPreference, Preference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { PreferenceComponent } from './preference.component';
import { PreferenceDetailComponent } from './preference-detail.component';
import { PreferenceUpdateComponent } from './preference-update.component';

@Injectable({ providedIn: 'root' })
export class PreferenceResolve implements Resolve<IPreference> {
  constructor(private service: PreferenceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPreference> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((preference: HttpResponse<Preference>) => {
          if (preference.body) {
            return of(preference.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Preference());
  }
}

export const preferenceRoute: Routes = [
  {
    path: '',
    component: PreferenceComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'twentyOnePointsApp.preference.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PreferenceDetailComponent,
    resolve: {
      preference: PreferenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.preference.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PreferenceUpdateComponent,
    resolve: {
      preference: PreferenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.preference.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PreferenceUpdateComponent,
    resolve: {
      preference: PreferenceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'twentyOnePointsApp.preference.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
