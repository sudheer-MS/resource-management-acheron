import { Timestamp } from 'rxjs';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Campaign {
  public constructor(
    public campaignId: number,
    public campaignName: string,
    public campaignOwner: string,
    public startDate: Date,
    public endDate: Date,
    public priority: Priority,
    public status: Status
  ) {}
}
