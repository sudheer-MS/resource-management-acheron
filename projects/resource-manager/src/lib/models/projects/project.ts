import { Campaign } from '../campaigns/campaign';
import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Project {
  public constructor(
    public projectId: number,
    public projectName: string,
    public startDate: Date,
    public endDate: Date,
    public priority: Priority,
    public status: Status,
    public campaign: Campaign
  ) {}
}
