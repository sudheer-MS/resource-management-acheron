import { Component, OnInit,  } from '@angular/core';
import { lastDayOfMonth, addDays, lastDayOfWeek, startOfMonth, subDays, startOfWeek } from 'date-fns';


@Component({
  selector: 'lib-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss'],
})
export class ResourceManagerComponent implements OnInit {

  monthDate: Date = new Date();
  activeView: string = "month"
  buttonValue: string = '';
  weekDate: Date = new Date();
  tabValue: string = 'Projects';
  constructor() { }

  ngOnInit(): void {
  }

  onClickForward = () => {
    let lastDayMonth = lastDayOfMonth(this.monthDate);
    this.monthDate = addDays(lastDayMonth, 1);
    let lastDayWeek = lastDayOfWeek(this.weekDate);
    this.weekDate = addDays(lastDayWeek, 1);
    if((this.buttonValue == 'next') ||(this.buttonValue == 'prev') || (this.buttonValue =='PREV')){
      this.buttonValue = 'NEXT';
    }else{
      this.buttonValue = 'next'
    }
  }
  onClickBackward = () => {
    let firstDayMonth = startOfMonth(this.monthDate);
    this.monthDate = subDays(firstDayMonth, 1);
    let firstDayWeek = startOfWeek(this.weekDate);
    this.weekDate = subDays(firstDayWeek,1);
    if((this.buttonValue == 'prev') || (this.buttonValue =='next') || (this.buttonValue =='NEXT')){
      this.buttonValue = 'PREV'
    }else{
      this.buttonValue = 'prev'
    }
  }
  onToggleButton = (value: string) => {
    if (value == 'month') {
      this.activeView = 'month';
    } else {
      this.activeView = 'week';
    }
  }

  onChangeTab = (tabValue:string) => {
    this.tabValue = tabValue;
  }

} 
