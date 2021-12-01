import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../../models/resources/resource';
import { Campaign } from '../../models/campaigns/campaign';
@Component({
  selector: 'lib-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
})
export class ResourcesComponent implements OnInit {
  @Input() resources: Resource[] = [];
  constructor() {}

  ngOnInit(): void {}
}
