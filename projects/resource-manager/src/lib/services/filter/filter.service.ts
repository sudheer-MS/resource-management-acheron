import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Priority } from '../../models/filter-models/priority/priority';
import { Status } from '../../models/filter-models/status/status';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  priorityFilter: Priority = {
    high: false,
    low: false,
    medium: false,
  };
  priorityFilter$: BehaviorSubject<Priority> = new BehaviorSubject<Priority>(
    this.priorityFilter
  );
  statusFilter: Status = {
    defined: false,
    inProgress: false,
    completed: false,
    onHold: false,
  };
  statusFilter$: BehaviorSubject<Status> = new BehaviorSubject<Status>(
    this.statusFilter
  );

  constructor() {}

  onChangePriorityFilter = (priorityForm: Priority) => {
    this.priorityFilter = priorityForm;
    this.priorityFilter$.next(this.priorityFilter);
  };

  onChangeStatusFilter = (statusForm: Status) => {
    this.statusFilter = statusForm;
    this.statusFilter$.next(this.statusFilter);
  };
  unchecked: Subject<any> = new Subject<any>();
}
