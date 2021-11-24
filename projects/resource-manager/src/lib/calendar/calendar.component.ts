import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  format,
  isSameMonth,
  startOfMonth,
  subDays,
  startOfWeek,
  lastDayOfMonth,
  addDays,
  lastDayOfWeek,
  isSameWeek,
  differenceInDays,
  getDay,
  getWeek,
  isWithinInterval,
  getDate,
  getDaysInMonth,
  endOfMonth,
  isSameYear,
  isSameDay,
} from 'date-fns';
import { CalendarService } from '../services/calendar/calendar.service';
@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  currentDate = format(new Date(), 'MM/dd/yyyy');
  currentMonthDates: Date[] = [];
  currentWeekDates: Date[] = [];
  panelOpenState = false;
  tasks: Object[] = [
    {
      taskName: 'Task A',
      startDate: new Date(2021, 10, 18),
      endDate: new Date(2021, 10, 22),
    },
    {
      taskName: 'Task AB',
      startDate: new Date(2021, 10, 18),
      endDate: new Date(2021, 10, 26),
    },
    {
      taskName: 'Task ABC',
      startDate: new Date(2021, 10, 13),
      endDate: new Date(2021, 10, 17),
    },
    {
      taskName: 'Task B',
      startDate: new Date(2021, 10, 12),
      endDate: new Date(2021, 11, 28),
    },
    {
      taskName: 'Task C',
      startDate: new Date(2021, 11, 13),
      endDate: new Date(2021, 11, 21),
    },
    {
      taskName: 'Task D',
      startDate: new Date(2021, 9, 3),
      endDate: new Date(2021, 9, 25),
    },
    {
      taskName: 'Task E',
      startDate: new Date(2021, 9, 6),
      endDate: new Date(2021, 11, 25),
    },
    {
      taskName: 'Task F',
      startDate: new Date(2021, 0, 4),
      endDate: new Date(2021, 11, 30),
    },
    {
      taskName: 'Task G',
      startDate: new Date(2021, 0, 4),
      endDate: new Date(2022, 11, 30),
    },
  ];

  currentWeekTasks: any[] = [];

  currentMonthTasks: any[] = [];

  constructor(private _calendarService: CalendarService) {}

  getWeekData = (date: Date) => {
    this.currentWeekDates = this._calendarService.takeWeek(date)();
  };

  @Input() monthDate = new Date();

  @Input() weekDate = new Date();

  @Input() selectButton = '';

  @Input() buttonValue = '';

  getMonthData = (date: Date) => {
    let monthData: Date[] = [];
    this._calendarService
      .takeMonth(date)()
      .forEach((eachWeek: any) =>
        eachWeek.forEach((eachDay: Date) => {
          if (isSameMonth(eachDay, date)) {
            monthData.push(eachDay);
          }
        })
      );
    this.currentMonthDates = monthData;
  };

  ngOnInit(): void {
    this.getWeekData(this.weekDate);
    this.getMonthData(this.monthDate);

    this.currentMonthTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, this.monthDate) ||
        isSameMonth(eachTask.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
    this.currentWeekTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
  }

  ngOnChanges(): void {
    if (this.buttonValue == 'next') {
      this.onClickNext();
    } else if (this.buttonValue == 'prev') {
      this.onClickBack();
    }
  }

  onClickBack = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.getMonthData(this.monthDate);
    this.getWeekData(this.weekDate);

    this.currentMonthTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, this.monthDate) ||
        isSameMonth(eachTask.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );

    this.currentWeekTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
  };

  onClickNext = (): void => {
    this.getMonthData(this.monthDate);
    this.getWeekData(this.weekDate);

    this.currentMonthTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, this.monthDate) ||
        isSameMonth(eachTask.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
    this.currentWeekTasks = this.tasks.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
  };

  formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
  };

  monthLeftSpace = (startDate: Date): string => {
    let margin;

    if (
      this.monthDate.getMonth() === startDate.getMonth() &&
      this.monthDate.getFullYear() === startDate.getFullYear()
    ) {
      let days = startDate.getDate() - 1;
      margin = days * 3.2 + 'vw'
      return margin;
    }
    return 0 + 'vw';
  };

  weekLeftSpace = (startDate: Date): string => {
    let margin;
    // check if startDate and currentDate are equal
    if (
      isSameWeek(this.weekDate, startDate) &&
      isSameMonth(this.weekDate, startDate) &&
      isSameYear(this.weekDate, startDate)
    ) {
      let days = getDay(startDate);
      margin = days * 11.8 + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  monthWidth = (startDate: Date, endDate: Date): string => {
    let width;
    let calculateDifference: number;

    let currentMonth = this.monthDate;
    let findStartDateOfEndMonth = startOfMonth(endDate);
    let findEndDateOfStartMonth = endOfMonth(startDate);
    let noOfDaysInCurrentMonth = getDaysInMonth(currentMonth);

    // Check if startDate and endDate are in same month
    if (isSameMonth(startDate, endDate)) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * 3.2 + 'vw'
      return width;
    }
    // Check if endDate month and current month are same month
    else if (isSameMonth(currentMonth, endDate)) {
      calculateDifference = differenceInDays(endDate, findStartDateOfEndMonth);
      width = (calculateDifference + 1) * 3.2 + 'vw'
      return width;
    }
    // Check if startDate month and current month are same month
    else if (isSameMonth(startDate, currentMonth)) {
      calculateDifference = differenceInDays(
        findEndDateOfStartMonth,
        startDate
      );
      width = (calculateDifference + 1) * 3.2 + '%';
      return width;
    }
    // check if both startDate and endDate are not related to current month
    else {
      width = noOfDaysInCurrentMonth * 3.2 + 'vw'
      return width;
    }
  };
  weekWidth = (startDate: Date, endDate: Date) => {
    let calculateDifference: number;
    let width: any;
    if (isSameWeek(endDate, startDate)) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * 11.8 + 'vw';
      return width;
    } else if (isSameWeek(endDate, this.weekDate)) {
      calculateDifference = differenceInDays(endDate, this.weekDate);
      width = (calculateDifference + 1) * 11.8 + 'vw';
      return width;
    }
  };
}
