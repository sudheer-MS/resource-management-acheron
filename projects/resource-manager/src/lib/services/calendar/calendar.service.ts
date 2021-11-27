import { Injectable } from '@angular/core';
import {
  format,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  isSameWeek,
  isWithinInterval,
  endOfMonth,
  addDays,
  lastDayOfMonth,
  lastDayOfWeek,
  subDays,
  endOfWeek,
  startOfDay,
} from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  activeView: string = 'month';

  currentDate = format(new Date(), 'MM/dd/yyyy');

  monthDate: Date = new Date();
  weekDate: Date = new Date();

  currentMonthDates: Date[] = [];
  currentWeekDates: Date[] = [];

  constructor() {}

  takeWeek(start: Date) {
    let date = startOfWeek(startOfDay(start));

    return function () {
      const week = [...Array(7)].map((_, i) => addDays(date, i));
      date = addDays(week[6], 1);
      return week;
    };
  }

  takeMonth = (start: Date) => {
    let month: any[] = [];
    let date = start;

    function lastDayOfRange(range: any) {
      return range[range.length - 1][6];
    }

    return function () {
      function takeWeek(start = new Date()) {
        let date = startOfWeek(startOfDay(start));

        return function () {
          const week = [...Array(7)].map((_, i) => addDays(date, i));
          date = addDays(week[6], 1);
          return week;
        };
      }
      const weekGen = takeWeek(startOfMonth(date));
      const endDate = startOfDay(endOfWeek(endOfMonth(date)));
      month.push(weekGen());

      while (lastDayOfRange(month) < endDate) {
        month.push(weekGen());
      }

      const range = month;
      month = [];
      date = addDays(lastDayOfRange(range), 1);

      return range;
    };
  };

  getWeekData = (date: Date): Date[] => {
    return (this.currentWeekDates = this.takeWeek(date)());
  };

  getMonthData = (date: Date): Date[] => {
    let monthData: Date[] = [];
    this.takeMonth(date)().forEach((eachWeek: any) =>
      eachWeek.forEach((eachDay: Date) => {
        if (isSameMonth(eachDay, date)) {
          monthData.push(eachDay);
        }
      })
    );
    this.currentMonthDates = monthData;
    return monthData;
  };

  onClickPreviousMonth = (): void => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    this.getMonthData(this.monthDate);
  };

  onClickPreviousWeek = (): void => {
    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek, 1);
    this.getWeekData(this.weekDate);
  };

  onClickNextMonth = (): void => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.getMonthData(this.monthDate);
  };

  onClickNextWeek = (): void => {
    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.getWeekData(this.weekDate);
  };

  getActiveView = (): string => {
    return this.activeView;
  };

  getCurrentMonthDates = (): Date[] => {
    return this.currentMonthDates;
  };

  getCurrentWeekDates = (): Date[] => {
    return this.currentWeekDates;
  };
}
