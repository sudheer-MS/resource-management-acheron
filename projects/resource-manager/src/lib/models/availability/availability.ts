import { AvailableStatus } from '../enums/available-status';

export class Availability {
  static CUSTOM: any;
  public constructor(
    public availableId: number,
    public availableType: string,
    public availableHours: number,
    public startDate: Date,
    public endDate: Date,
    public availableStatus: AvailableStatus
  ) {}
}
