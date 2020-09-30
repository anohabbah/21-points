import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';
import { PointService } from 'app/entities/point/point.service';
import { PreferenceService } from 'app/entities/preference/preference.service';
import { IPreference } from 'app/shared/model/preference.model';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  eventSubscriber: Subscription | undefined;
  pointsThisWeek: any = {};
  pointsPercentage = 0;
  preferences: IPreference = { weeklyGoal: 10 };

  constructor(
    private accountService: AccountService,
    private loginModalService: LoginModalService,
    private eventManager: JhiEventManager,
    private pointService: PointService,
    private preferenceService: PreferenceService
  ) {}

  getUserData(): void {
    this.preferenceService.user().subscribe((preference: any) => {
      this.preferences = preference.body;

      this.pointService.thisWeek().subscribe((res: any) => {
        const points = res.body;
        const weeklyGoal = this.preferences.weeklyGoal || 10;
        this.pointsThisWeek = points;
        this.pointsPercentage = (points.points / weeklyGoal) * 100;

        if (points.points >= weeklyGoal) {
          this.pointsThisWeek.progress = 'success';
        } else if (points.points < 10) {
          this.pointsThisWeek.progress = 'danger';
        } else if (points.points > 10) {
          this.pointsThisWeek.progress = 'warning';
        }
      });
    });
  }

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
      this.getUserData();
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  registerAuthenticationSuccess(): void {
    this.eventManager.subscribe('authenticationSuccess', () => {
      this.accountService.getAuthenticationState().subscribe(account => {
        this.account = account;
        this.getUserData();
      });
    });
    this.eventSubscriber = this.eventManager.subscribe('pointsListModification', () => this.getUserData());
    this.eventSubscriber = this.eventManager.subscribe('bloodPressureListModification', () => this.getUserData());
    this.eventSubscriber = this.eventManager.subscribe('preferenceListModification', () => this.getUserData());
    this.eventSubscriber = this.eventManager.subscribe('weightListModification', () => this.getUserData());
  }
}
