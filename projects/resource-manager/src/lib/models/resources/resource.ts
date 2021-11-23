import { Availability } from '../enums/availability';

export class Resource {
  public constructor(
    public resourceId: number,
    public resourceName: string,
    public resourceType: string,
    public availability: Availability
  ) {}
}
