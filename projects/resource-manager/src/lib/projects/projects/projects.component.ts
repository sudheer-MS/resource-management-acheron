import { Component, Input, OnInit, Output } from '@angular/core';
import {lastDayOfMonth, addDays, format, startOfMonth, subDays, startOfWeek, lastDayOfWeek } from 'date-fns';
import { CalendarService } from '../../services/calendar/calendar.service';

@Component({
  selector: 'lib-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  @Input() monthDate = new Date();
  @Input() activeView = '';
  @Input() buttonValue = '';
  @Input() weekDate = new Date();
  constructor() { }

  ngOnInit(): void {
    
  }
}
