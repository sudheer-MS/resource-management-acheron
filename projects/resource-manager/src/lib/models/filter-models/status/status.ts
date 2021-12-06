export class StatusFilter {
  constructor(
    public defined: boolean,
    public inProgress: boolean,
    public completed: boolean,
    public onHold: boolean
  ) {}
}
