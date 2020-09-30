import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPoint, Point } from 'app/shared/model/point.model';
import { PointService } from './point.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-point-update',
  templateUrl: './point-update.component.html',
})
export class PointUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    exercise: [],
    meals: [],
    alcohol: [],
    notes: [null, [Validators.maxLength(140)]],
    user: [],
  });

  constructor(
    protected pointService: PointService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ point }) => {
      this.updateForm(point);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(point: IPoint): void {
    this.editForm.patchValue({
      id: point.id,
      date: point.date,
      exercise: point.exercise,
      meals: point.meals,
      alcohol: point.alcohol,
      notes: point.notes,
      user: point.user,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const point = this.createFromForm();
    if (point.id !== undefined) {
      this.subscribeToSaveResponse(this.pointService.update(point));
    } else {
      this.subscribeToSaveResponse(this.pointService.create(point));
    }
  }

  private createFromForm(): IPoint {
    return {
      ...new Point(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      exercise: this.editForm.get(['exercise'])!.value,
      meals: this.editForm.get(['meals'])!.value,
      alcohol: this.editForm.get(['alcohol'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPoint>>): void {
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
