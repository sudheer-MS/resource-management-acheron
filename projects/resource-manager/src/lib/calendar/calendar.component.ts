import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  isSameWeek,
  differenceInDays,
  getDay,
  isWithinInterval,
  getDaysInMonth,
  endOfMonth,
  isSameYear,
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
      startDate: new Date(2021, 10, 9),
      endDate: new Date(2021, 10, 13),
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
      endDate: new Date(2021, 11, 24),
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

  @Input() monthDate = new Date();

  @Input() weekDate: Date = new Date();

  @Input() activeView: string = '';

  @Input() buttonValue: string = '';

  getWeekData = (date: Date) => {
    this.currentWeekDates = this._calendarService.takeWeek(date)();
  };

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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (!changes['activeView']) {
      if (this.buttonValue == 'next') {
        this.onClickNext();
      } else if (this.buttonValue == 'prev') {
        this.onClickBack();
      }
    }
  }

  onClickBack = () => {
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
    let noOfDaysInCurrentMonth = getDaysInMonth(this.monthDate);
    let eachContainerWidth = 85 / noOfDaysInCurrentMonth;

    // check if startDate and currentDate are equal
    if (
      this.monthDate.getMonth() === startDate.getMonth() &&
      this.monthDate.getFullYear() === startDate.getFullYear()
    ) {
      let days = startDate.getDate() - 1;
      margin = days * eachContainerWidth + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  weekLeftSpace = (startDate: Date): string => {
    let margin;
    let eachContainerWidth = 85 / 7;

    // check if startDate and currentDate are equal
    if (
      isSameWeek(this.weekDate, startDate) &&
      isSameMonth(this.weekDate, startDate) &&
      isSameYear(this.weekDate, startDate)
    ) {
      let days = getDay(startDate);
      margin = days * eachContainerWidth + 'vw';
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
    let noOfDaysInStartMonth = getDaysInMonth(startDate);
    let noOfDaysInEndMonth = getDaysInMonth(endDate);

    // Check if startDate and endDate are in same month
    if (isSameMonth(startDate, endDate) && isSameYear(startDate, endDate)) {
      let eachContainerWidth = 85 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if endDate month and current month are same month
    else if (
      isSameMonth(currentMonth, endDate) &&
      isSameYear(currentMonth.getFullYear(), endDate.getFullYear())
    ) {
      let eachContainerWidth = 85 / noOfDaysInEndMonth;
      calculateDifference = differenceInDays(endDate, findStartDateOfEndMonth);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if startDate month and current month are same month
    else if (
      isSameMonth(startDate, currentMonth) &&
      isSameYear(startDate, currentMonth)
    ) {
      let eachContainerWidth = 85 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(
        findEndDateOfStartMonth,
        startDate
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // check if both startDate and endDate are not related to current month
    else {
      let eachContainerWidth = 85 / noOfDaysInCurrentMonth;
      width = noOfDaysInCurrentMonth * eachContainerWidth + 'vw';
      return width;
    }
  };

  weekWidth = (startDate: Date, endDate: Date) => {
    let calculateDifference: number;
    let eachContainerWidth = 85 / 7;
    let width;

    if (
      isSameWeek(endDate, startDate) &&
      isSameMonth(startDate, endDate) &&
      isSameYear(startDate, endDate)
    ) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else if (isSameWeek(endDate, this.weekDate)) {
      calculateDifference = differenceInDays(
        endDate,
        startOfWeek(this.weekDate)
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else {
      width = 7 * eachContainerWidth + 'vw';
      return width;
    }
  };
}
