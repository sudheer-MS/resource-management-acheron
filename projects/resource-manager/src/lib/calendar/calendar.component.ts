import { Component, OnInit } from '@angular/core';
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
  month: any[] = [];
  week: any[] = [];
  monthDate: any = new Date();
  weekDate: any = new Date();
  selectButton: string = 'month';
  panelOpenState = false;
  tasks: any = [
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

  currentWeekTasks: any = [];

  currentMonthTasks: any = [];

  constructor(private _calendarService: CalendarService) {}

  getWeekData = (date: Date) => {
    this.week = this._calendarService.takeWeek(date)();
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
    this.month = monthData;
  };

  ngOnInit(): void {
    this.getWeekData(this.weekDate);
    this.getMonthData(this.monthDate);

    this.currentMonthTasks = this.tasks.filter((eachTask: any) =>
      isSameMonth(eachTask.startDate, this.monthDate)
    );

    this.currentWeekTasks = this.tasks.filter((eachTask: any) =>
      isSameWeek(eachTask.startDate, this.weekDate)
    );
  }

  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.selectButton = 'month';
    } else {
      this.selectButton = 'week';
    }
  };

  onClickBack = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.getMonthData(this.monthDate);

    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek, 1);
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
    console.log(this.currentMonthTasks);
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

  onClickNext = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.getMonthData(this.monthDate);

    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
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

  formatDate = (date: any) => {
    return format(date, 'MM/dd/yyyy');
  };

  monthLeftSpace = (startDate: Date) => {
    let margin: any;

    // check if startDate and currentDate are equal
    if (
      this.monthDate.getMonth() === startDate.getMonth() &&
      this.monthDate.getFullYear() === startDate.getFullYear()
    ) {
      let days = startDate.getDate() - 1;
      margin = days * 3.2 + 'rem';
      return margin;
    }
    return 0 + 'rem';
  };

  weekLeftSpace = (startDate: Date) => {
    let margin: any;
    if (
      isSameWeek(this.weekDate, startDate) &&
      isSameMonth(this.weekDate, startDate) &&
      isSameYear(this.weekDate, startDate)
    ) {
      let days = getDay(startDate);
      margin = days * 13.6 + 0.3 + 'rem';
      return margin;
    }
    return 0 + 'rem';
  };

  monthWidth = (startDate: Date, endDate: Date) => {
    let width: any;
    let calculateDifference: any;

    let currentMonth = this.monthDate;
    let findStartDateOfEndMonth = startOfMonth(endDate);
    let findEndDateOfStartMonth = endOfMonth(startDate);
    let noOfDaysInCurrentMonth = getDaysInMonth(currentMonth);

    // Check if startDate and endDate are in same month
    if (isSameMonth(startDate, endDate)) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * 3.2 + 'rem';
      return width;
    }
    // Check if endDate month and current month are same month
    else if (isSameMonth(currentMonth, endDate)) {
      calculateDifference = differenceInDays(endDate, findStartDateOfEndMonth);
      width = (calculateDifference + 1) * 3.2 + 'rem';
      return width;
    }
    // Check if startDate month and current month are same month
    else if (isSameMonth(startDate, currentMonth)) {
      calculateDifference = differenceInDays(
        findEndDateOfStartMonth,
        startDate
      );
      width = (calculateDifference + 1) * 3.2 + 'rem';
      return width;
    }
    // check if both startDate and endDate are not related to current month
    else {
      width = noOfDaysInCurrentMonth * 3.2 + 'rem';
      return width;
    }
  };

  weekWidth = (startDate: Date, endDate: Date) => {
    let calculateDifference: any;
    let checkSameWeek = isSameWeek(endDate, startDate);
    let width: any;
    if (checkSameWeek) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * 13.6 + 'rem';
      return width;
    }
  };
}
