import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
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
}
