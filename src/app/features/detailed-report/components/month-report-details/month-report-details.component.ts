import { Component, OnInit } from '@angular/core';
import {
  IonDatetime,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-month-report-details',
  templateUrl: './month-report-details.component.html',
  styleUrls: ['./month-report-details.component.scss'],
  imports: [IonDatetime, IonCard, IonCardContent],
})
export class MonthReportDetailsComponent implements OnInit {
  maxDate: string = '';

  //TODO: Replace with actual selected dates from user data.
  selectedDates: string[] = [
    '2025-09-01T06:00:00',
    '2025-09-05T20:00:00',
    '2025-09-10T06:00:00',
    '2025-09-11T16:00:00',
    '2025-09-12T06:00:00',
    '2025-09-16T06:00:00',
    '2025-08-15T16:00:00',
    '2025-08-20T06:00:00',
    '2025-08-21T06:00:00',
    '2025-08-22T02:00:00',
    '2025-09-06T06:00:00',
  ];

  constructor() {
    //Makes the last day of current month the max selectable date.
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    this.maxDate = lastDay.toISOString();
  }

  ngOnInit() { }
}
