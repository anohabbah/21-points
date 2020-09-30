import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPreference } from 'app/shared/model/preference.model';
import { PreferenceService } from './preference.service';

@Component({
  templateUrl: './preference-delete-dialog.component.html',
})
export class PreferenceDeleteDialogComponent {
  preference?: IPreference;

  constructor(
    protected preferenceService: PreferenceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.preferenceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('preferenceListModification');
      this.activeModal.close();
    });
  }
}
