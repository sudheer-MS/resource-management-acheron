import { Component, OnInit,  } from '@angular/core';
import {lastDayOfMonth, addDays, format, startOfMonth, subDays, startOfWeek, lastDayOfWeek } from 'date-fns';
import { CalendarService } from './services/calendar/calendar.service';


@Component({
  selector: 'lib-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss']
})
export class ResourceManagerComponent implements OnInit {


  monthDate: Date = new Date();
  selectButton: string = "month"
  buttonValue: string = '';
  weekDate: Date = new Date();
  nmonthDate = format(this.monthDate, 'MM/dd/yyyy')

  constructor(private _calendarService: CalendarService) { }

  ngOnInit(): void {
  }

  onClickForward = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.nmonthDate = format(this.monthDate, 'MM/dd/yyyy')
    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.buttonValue = 'next';
    console.log(this.monthDate)
  }
  onClickBackward = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.nmonthDate = format(this.monthDate, 'MM/dd/yyyy')
    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek,1);
    this.buttonValue = 'prev'
  }
  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.selectButton = 'month';
    } else {
      this.selectButton = 'week';
    }
  };
}