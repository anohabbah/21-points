import { IUser } from 'app/core/user/user.model';
import { Units } from 'app/shared/model/enumerations/units.model';

export interface IPreference {
  id?: number;
  weeklyGoal?: number;
  weightUnits?: Units;
  user?: IUser;
}

export class Preference implements IPreference {
  constructor(public id?: number, public weeklyGoal?: number, public weightUnits?: Units, public user?: IUser) {}
}
