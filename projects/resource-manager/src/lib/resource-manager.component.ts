import { Component, OnInit,  } from '@angular/core';
import {lastDayOfMonth, addDays, isSameMonth, isSameWeek, isWithinInterval, lastDayOfWeek, format, startOfMonth, subDays } from 'date-fns';
import { CalendarService } from './services/calendar/calendar.service';


@Component({
  selector: 'lib-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss']
})
export class ResourceManagerComponent implements OnInit {


  monthDate: Date = new Date();
  selectButton: string = ""
  nmonthDate = format(this.monthDate, 'MM/dd/yyyy')

  constructor(private _calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  onClickNextMonth = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    console.log(this.monthDate);
  }

  onClickPrevMonth = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
  }

  onClickForward = () => {
    this.onClickNextMonth();
  }
  onClickBackward = () => {
    this.onClickPrevMonth();
  }
  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.selectButton = 'month';
    } else {
      this.selectButton = 'week';
    }
  };
}




