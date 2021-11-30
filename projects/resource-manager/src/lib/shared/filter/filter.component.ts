import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  regions = ['IMEA', 'LATAM', 'EMEA', 'NAC', 'EPAC'];
  regionCopy = this.regions;
  priorityForm: FormGroup;
  regionForm: FormGroup;
  statusForm: FormGroup;
  categoryForm: FormGroup;
  rangeForm: FormGroup;
  startDateForm: FormGroup;
  endDateForm: FormGroup;

  @Output() priorityFilter = new EventEmitter();
  @Output() statusFilter = new EventEmitter();

  highFilterCount = 0;
  lowFilterCount = 0;
  definedFilterCount = 0;
  inProgressFilterCount = 0;
  regionFilterCount = 0;
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

  constructor(private formBuilder: FormBuilder) {
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
    this.rangeForm = this.formBuilder.group({
      start: new FormControl(),
      end: new FormControl(),
    });
    this.startDateForm = this.formBuilder.group({
      startDate: new FormControl(''),
    });
    this.endDateForm = this.formBuilder.group({
      endDate: new FormControl(''),
    });
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
