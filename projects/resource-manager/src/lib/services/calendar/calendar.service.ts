import { Injectable } from '@angular/core';
import {
  isSameMonth,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  addDays,
  lastDayOfMonth,
  lastDayOfWeek,
  subDays,
  endOfWeek,
  startOfDay,
  isWithinInterval,
  isSameWeek,
} from 'date-fns';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  calendarView: string = 'month';
  calendarView$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.calendarView
  );

  monthDate: Date = new Date();
  monthDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.monthDate);
  weekDate: Date = new Date();
  weekDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(this.weekDate);

  currentMonthDates: Date[] = [];
  currentMonthDates$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(
    this.currentMonthDates
  );
  currentWeekDates: Date[] = [];
  currentWeekDates$: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>(
    this.currentWeekDates
  );

  currentWeekProjects: any[] = [];
  currentWeekProjects$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.currentWeekProjects
  );
  currentMonthProjects: any[] = [];
  currentMonthProjects$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    this.currentMonthProjects
  );

  projects: Object[] = [
    {
      campaignName: 'Campaign A',
      startDate: new Date(2021, 10, 6),
      endDate: new Date(2021, 10, 26),
      name: 'John',
      priority: 'HIGH',
      projectList: [
        {
          projectName: 'Project A',
          startDate: new Date(2021, 10, 6),
          endDate: new Date(2021, 10, 26),
          name: 'Andrus',
          priority: 'LOW',
          taskList: [
            {
              taskName: 'Task A',
              startDate: new Date(2021, 10, 6),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
            {
              taskName: 'Task AB',
              startDate: new Date(2021, 10, 6),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
          ],
        },
        {
          projectName: 'Project AB',
          startDate: new Date(2021, 10, 6),
          endDate: new Date(2021, 10, 26),
          name: 'Andrus',
          priority: 'LOW',
          taskList: [
            {
              taskName: 'Task AB',
              startDate: new Date(2021, 10, 6),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
          ],
        },
      ],
    },
    {
      campaignName: 'Campaign B',
      startDate: new Date(2021, 11, 6),
      endDate: new Date(2021, 11, 26),
      name: 'John',
      priority: 'HIGH',
      projectList: [
        {
          projectName: 'Project B',
          startDate: new Date(2021, 11, 6),
          endDate: new Date(2021, 11, 26),
          name: 'Andrus',
          priority: 'LOW',
          taskList: [
            {
              taskName: 'Task B',
              startDate: new Date(2021, 11, 6),
              endDate: new Date(2021, 11, 26),
              name: 'Riya',
              priority: 'Low',
            },
          ],
        },
      ],
    },
    {
      campaignName: 'Campaign C',
      startDate: new Date(2021, 10, 20),
      endDate: new Date(2022, 11, 26),
      name: 'John',
      priority: 'HIGH',
      projectList: [
        {
          projectName: 'Project A',
          startDate: new Date(2021, 10, 20),
          endDate: new Date(2021, 10, 26),
          name: 'Andrus',
          priority: 'LOW',
          taskList: [
            {
              taskName: 'Task A',
              startDate: new Date(2021, 10, 20),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
            {
              taskName: 'Task AB',
              startDate: new Date(2021, 10, 20),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
          ],
        },
        {
          projectName: 'Project AB',
          startDate: new Date(2021, 10, 20),
          endDate: new Date(2021, 10, 26),
          name: 'Andrus',
          priority: 'LOW',
          taskList: [
            {
              taskName: 'Task AB',
              startDate: new Date(2021, 10, 20),
              endDate: new Date(2021, 10, 26),
              name: 'Riya',
              priority: 'Low',
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    this.onChangeCurrentMonthProjects();
    this.onChangeCurrentWeekProjects();
  }

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
    this.currentWeekDates = this.takeWeek(date)();
    return this.currentWeekDates;
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
    this.monthDate$.next(this.monthDate);
    this.getMonthData(this.monthDate);
    this.currentMonthDates$.next(this.currentMonthDates);
  };

  onClickPreviousWeek = (): void => {
    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek, 1);
    this.weekDate$.next(this.weekDate);
    this.getWeekData(this.weekDate);
    this.currentWeekDates$.next(this.currentWeekDates);
  };

  onClickNextMonth = (): void => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    this.monthDate$.next(this.monthDate);
    this.getMonthData(this.monthDate);
    this.currentMonthDates$.next(this.currentMonthDates);
  };

  onClickNextWeek = (): void => {
    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    this.weekDate$.next(this.weekDate);
    this.getWeekData(this.weekDate);
    this.currentWeekDates$.next(this.currentWeekDates);
  };

  getCurrentCalendarView = (): string => {
    return this.calendarView;
  };

  onChangeCalendarView = (currentCalendarView: string): void => {
    this.calendarView = currentCalendarView;
    this.calendarView$.next(this.calendarView);
  };

  getCurrentMonthDates = (): Date[] => {
    return this.currentMonthDates;
  };

  getCurrentWeekDates = (): Date[] => {
    return this.currentWeekDates;
  };

  onChangeCurrentMonthProjects = () => {
    this.currentMonthProjects = this.projects.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, this.monthDate) ||
        isSameMonth(eachTask.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );

    this.currentMonthProjects$.next(this.currentMonthProjects);
  };

  onChangeCurrentWeekProjects = () => {
    this.currentWeekProjects = this.projects.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );

    this.currentWeekProjects$.next(this.currentWeekProjects);
  };

  updateProjectsOnViewChange = () => {
    this.currentMonthProjects = this.projects.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, new Date()) ||
        isSameMonth(eachTask.endDate, new Date()) ||
        isWithinInterval(new Date(), {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
    this.currentMonthProjects$.next(this.currentMonthProjects);

    this.currentWeekProjects = this.projects.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, new Date()) ||
        isSameWeek(eachTask.endDate, new Date()) ||
        isWithinInterval(new Date(), {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
    this.currentWeekProjects$.next(this.currentWeekProjects);
  };
}
