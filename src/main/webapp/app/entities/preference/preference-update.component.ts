import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPreference, Preference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-preference-update',
  templateUrl: './preference-update.component.html',
})
export class PreferenceUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    weeklyGoal: [null, [Validators.min(10), Validators.max(21)]],
    weightUnits: [null, [Validators.required]],
    user: [],
  });

  constructor(
    protected preferenceService: PreferenceService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ preference }) => {
      this.updateForm(preference);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(preference: IPreference): void {
    this.editForm.patchValue({
      id: preference.id,
      weeklyGoal: preference.weeklyGoal,
      weightUnits: preference.weightUnits,
      user: preference.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const preference = this.createFromForm();
    if (preference.id !== undefined) {
      this.subscribeToSaveResponse(this.preferenceService.update(preference));
    } else {
      this.subscribeToSaveResponse(this.preferenceService.create(preference));
    }
  }

  private createFromForm(): IPreference {
    return {
      ...new Preference(),
      id: this.editForm.get(['id'])!.value,
      weeklyGoal: this.editForm.get(['weeklyGoal'])!.value,
      weightUnits: this.editForm.get(['weightUnits'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPreference>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IUser): any {
    return item.id;
  }
}
