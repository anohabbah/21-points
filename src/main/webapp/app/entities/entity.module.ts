import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'points',
        loadChildren: () => import('./point/point.module').then(m => m.TwentyOnePointsPointModule),
      },
      {
        path: 'preferences',
        loadChildren: () => import('./preference/preference.module').then(m => m.TwentyOnePointsPreferenceModule),
      },
      {
        path: 'weights',
        loadChildren: () => import('./weight/weight.module').then(m => m.TwentyOnePointsWeightModule),
      },
      {
        path: 'blood-pressures',
        loadChildren: () => import('./blood-pressure/blood-pressure.module').then(m => m.TwentyOnePointsBloodPressureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TwentyOnePointsEntityModule {}
