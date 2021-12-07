import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateFilter } from '../../models/filter-models/date/date-filter';
import { PriorityFilter } from '../../models/filter-models/priority/priority';
import { RegionFilter } from '../../models/filter-models/region/region-filter';
import { StatusFilter } from '../../models/filter-models/status/status';
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

  priorityFilter: PriorityFilter = {
    high: false,
    low: false,
    medium: false,
  };
  statusFilter: StatusFilter = {
    defined: false,
    in_progress: false,
    completed: false,
    on_hold: false,
  };

  regionFilter: RegionFilter = {
    IMEA: false,
    LATAM: false,
    EMEA: false,
    NAC: false,
    EPAC: false,
  };
  dateFilter: DateFilter = {
    startDate: new Date(),
    endDate: new Date(),
  };

  highFilterCount = 0;
  lowFilterCount = 0;
  definedFilterCount = 0;
  inProgressFilterCount = 0;
  regionFilterCount = 0;

  constructor(
    private formBuilder: FormBuilder,
    private filterService: FilterService
  ) {
    this.priorityForm = this.formBuilder.group({
      high: false,
      low: false,
      medium: false,
    });
    this.statusForm = this.formBuilder.group({
      defined: false,
      inProgress: false,
      completed: false,
      onHold: false,
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

    this.filterService.priorityFilter$.subscribe(
      (priorityFilter: PriorityFilter) => {
        this.priorityForm.setValue(priorityFilter);
      }
    );
    this.filterService.statusFilter$.subscribe((statusFilter: StatusFilter) => {
      this.statusForm.setValue(statusFilter);
    });
  }

  onChangePriority = (priorityForm: FormGroup) => {
    this.priorityFilter = {
      high: priorityForm.value.high,
      low: priorityForm.value.low,
      medium: priorityForm.value.medium,
    };
    this.filterService.onChangePriorityFilter(this.priorityFilter);
    this.filterService.priorityFilter$.next(this.priorityFilter);
  };
  onChangeRegion = (regionForm: FormGroup) => {
    this.regionFilter = {
      IMEA: regionForm.value.IMEA,
      LATAM: regionForm.value.LATAM,
      EMEA: regionForm.value.EMEA,
      NAC: regionForm.value.NAC,
      EPAC: regionForm.value.EPAC,
    };
    this.filterService.onChangeRegionFilter(this.regionFilter);
  };
  onChangeStatus = (statusForm: FormGroup) => {
    this.statusFilter = {
      defined: statusForm.value.defined,
      in_progress: statusForm.value.inProgress,
      completed: statusForm.value.completed,
      on_hold: statusForm.value.onHold,
    };
    this.filterService.onChangeStatusFilter(this.statusFilter);
  };

  onChangeDate = (dateForm: FormGroup) => {
    this.dateFilter = {
      startDate: dateForm.value.startDate,
      endDate: dateForm.value.endDate,
    };
    this.filterService.onChangeDateFilter(this.dateFilter);
  };
  search(event: any): void {
    let value = (event.target as HTMLInputElement).value;
    this.regions = this.regionCopy;
    this.regions = this.regions.filter((val) =>
      val.toLowerCase().includes(value.toLowerCase())
    );
  }
}
