import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SampleJson } from '../../dummyfilter';
import { Campaign } from '../../models/campaigns/campaign';
import { FilterService } from '../../services/filter/filter.service';

@Component({
  selector: 'lib-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  campaign: Object[] = [];
  panelOpenState: boolean = false;
  highFilterCount = 0;
  lowFilterCount = 0;
  definedFilterCount = 0;
  inProgressFilterCount = 0;
  regionFilterCount = 0;

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

  @Output() priorityFilter = new EventEmitter();
  @Output() statusFilter = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {
    this.priorityForm = this.formBuilder.group({
      high: false,
      low: false,
    });
    this.statusForm = this.formBuilder.group({
      defined: false,
      inProgress: false,
    });
    this.categoryForm = this.formBuilder.group({
      na: false,
      qa: false,
      series: false,
    });
    this.regionForm = this.formBuilder.group({
      IMEA: false,
      LATAM: false,
      EMEA: false,
      NAC: false,
      EPAC: false,
    });
  }

  ngOnInit(): void {
    // this.campaign.forEach((campaignVal) => {
    //   if (campaignVal.priority == 'HIGH') {
    //     this.highFilterCount++;
    //   }
    //   if (campaignVal.priority == 'LOW') {
    //     this.lowFilterCount++;
    //   }
    //   if (campaignVal.status == 'DEFINED') {
    //     this.definedFilterCount++;
    //   }
    //   if (campaignVal.status == 'IN_PROGRESS') {
    //     this.inProgressFilterCount++;
    //   }
    // });
  }

  search(event: any): void {
    let value = (event.target as HTMLInputElement).value;
    this.regions = this.regionCopy;
    this.regions = this.regions.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }

  onChangePriority = (priorityForm: FormGroup) => {
    this.priorityFilter.emit(priorityForm.value);
  };

  onChangeStatus = (statusForm: FormGroup) => {
    this.priorityFilter.emit(statusForm.value);
  };
}
