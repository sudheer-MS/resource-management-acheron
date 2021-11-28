import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { format } from 'date-fns';
import { CalendarService } from '../../services/calendar/calendar.service';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  panelOpenState: boolean = false;
  calendarView: string;

  currentDate = format(new Date(), 'MM/dd/yyyy');

  monthDate: Date = new Date();
  weekDate: Date = new Date();

  currentMonthDates: Date[] = [];
  currentWeekDates: Date[] = [];

  constructor(private _calendarService: CalendarService) {
    this.calendarView = this._calendarService.getCurrentCalendarView();
  }

  ngOnInit(): void {
    this._calendarService.currentMonthDates$.subscribe(
      (currentMonthDates: Date[]) => {
        this.currentMonthDates = currentMonthDates;
      }
    );
    this._calendarService.currentWeekDates$.subscribe(
      (currentWeekDates: Date[]) => {
        this.currentWeekDates = currentWeekDates;
      }
    );
    this._calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );
    this.currentWeekDates = this._calendarService.getWeekData(this.weekDate);
    this.currentMonthDates = this._calendarService.getMonthData(this.monthDate);
  }

  formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
  };
}
