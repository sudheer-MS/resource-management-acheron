import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  panelOpenState: boolean = false;
  priorityForm: FormGroup;
  regionForm: FormGroup;
  statusForm: FormGroup;
  categoryForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.priorityForm = formBuilder.group({
      high: false,
      low: false,
    });
    this.regionForm = formBuilder.group({
      region: '',
      imea: false,
      latam: false,
      emea: false,
      nac: false,
      epac: false,
    });
    this.statusForm = formBuilder.group({
      defined: false,
      inProgress: false,
    });
    this.categoryForm = formBuilder.group({
      na: false,
      qa: false,
      series: false,
    });
  }
  ngOnInit(): void {}
}
