import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from './services/header/header.service';

@Component({
  selector: 'lib-resource-manager',
  templateUrl: './resource-manager.component.html',
  styleUrls: ['./resource-manager.component.scss'],
})
export class ResourceManagerComponent implements OnInit {
  tabValue: string;

  @Input() projects: Object[] = [];
  @Input() resources: Object[] = [];

  constructor(private headerService: HeaderService) {
    this.tabValue = this.headerService.tabValue;
  }

  ngOnInit(): void {
    this.headerService.tabValue$.subscribe(
      (currentTabValue) => (this.tabValue = currentTabValue)
    );
  }
}
