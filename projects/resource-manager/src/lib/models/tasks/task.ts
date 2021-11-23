import { Priority } from '../enums/priority';
import { Status } from '../enums/status';

export class Task {
  public constructor(
    public taskId: number,
    public taskName: string,
    public taskOwner: string,
    public startdate: Date,
    public enddate: Date,
    public duration: number,
    public priority: Priority,
    public status: Status
  ) {}
}
