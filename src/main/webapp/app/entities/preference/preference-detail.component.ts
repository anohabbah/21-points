import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPreference } from 'app/shared/model/preference.model';

@Component({
  selector: 'jhi-preference-detail',
  templateUrl: './preference-detail.component.html',
})
export class PreferenceDetailComponent implements OnInit {
  preference: IPreference | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ preference }) => (this.preference = preference));
  }

  previousState(): void {
    window.history.back();
  }
}
