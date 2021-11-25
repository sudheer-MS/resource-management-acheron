import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  panelOpenState: boolean = false;
  regions = ['IMEA', 'LATAM', 'EMEA', 'NAC', 'EPAC'];
  regionCopy = this.regions;
  priorityForm: FormGroup;
  regionForm: FormGroup;
  statusForm: FormGroup;
  categoryForm: FormGroup;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  startDate = new FormControl('');
  endDate = new FormControl('');
  constructor(private formBuilder: FormBuilder) {
    this.priorityForm = formBuilder.group({
      high: false,
      low: false,
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
    this.regionForm = formBuilder.group({
      IMEA: false,
      LATAM: false,
      EMEA: false,
      NAC: false,
      EPAC: false,
    });
  }
  ngOnInit(): void {}
  search(event: any): void {
    let value = (event.target as HTMLInputElement).value;
    this.regions = this.regionCopy;

    this.regions = this.regions.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
}
