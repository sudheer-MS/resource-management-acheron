import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  priorityForm: FormGroup;
  priorityForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(
    this.formBuilder.group({
      high: false,
      low: false,
    })
  );

  statusForm: FormGroup;
  statusForm$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(
    this.formBuilder.group({
      defined: false,
      inProgress: false,
    })
  );

  constructor(private formBuilder: FormBuilder) {
    this.priorityForm = formBuilder.group({
      high: false,
      low: false,
    });
    this.statusForm = formBuilder.group({
      defined: false,
      inProgress: false,
    });
  }

  onChangePriority = (priorityForm: FormGroup) => {
    this.priorityForm = priorityForm;
    this.priorityForm$.next(this.priorityForm);
  };
  onChangeStatus = (statusForm: FormGroup) => {
    this.statusForm = statusForm;
    this.statusForm$.next(this.statusForm);
  };
}
