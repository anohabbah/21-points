import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'point',
        loadChildren: () => import('./point/point.module').then(m => m.TwentyOnePointsPointModule),
      },
      {
        path: 'preference',
        loadChildren: () => import('./preference/preference.module').then(m => m.TwentyOnePointsPreferenceModule),
      },
      {
        path: 'weight',
        loadChildren: () => import('./weight/weight.module').then(m => m.TwentyOnePointsWeightModule),
      },
      {
        path: 'blood-pressure',
        loadChildren: () => import('./blood-pressure/blood-pressure.module').then(m => m.TwentyOnePointsBloodPressureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class TwentyOnePointsEntityModule {}
