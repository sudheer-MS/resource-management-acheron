import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-display-fields',
  templateUrl: './display-fields.component.html',
  styleUrls: ['./display-fields.component.css'],
})
export class DisplayFieldsComponent implements OnInit {
  selectedValue: string = '';
  displayFields: FormGroup;
  constructor(fb: FormBuilder) {
    this.displayFields = fb.group({
      name: false,
      startDate: false,
      owner: false,
      duration: false,
      endDate: false,
      priority: false,
    });
  }

  ngOnInit(): void {}
}
