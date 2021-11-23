import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.scss'],
})
export class TaskAllocationComponent implements OnInit {
  
  taskFormAllocation: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.taskFormAllocation = formBuilder.group({
      startDate: '',
      endDate: '',
      actualStartDate: '',
      actualEndDate: '',
      status:'',
      priority: '',
    });
  }

  ngOnInit(): void {}
}
