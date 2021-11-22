import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();

  @Input()
  onClickForward!: () => any;

  @Input()
  onClickBackward!: () => any;

  @Input()
  onToggleButton!: (value:string) => any;

  @Input() monthDate = new Date();

  ngOnInit(): void {}

  
}
