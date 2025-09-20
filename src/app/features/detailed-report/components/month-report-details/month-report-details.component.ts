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
    '2025-09-01',
    '2025-09-05',
    '2025-09-10',
    '2025-09-11',
    '2025-09-12',
    '2025-09-16',
    '2025-08-15',
    '2025-08-20',
    '2025-08-21',
    '2025-08-22',
    '2025-09-06',
  ];

  constructor() {
    //Makes the last day of current month the max selectable date.
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    lastDay.setHours(23, 59, 59, 999);
    this.maxDate = lastDay.toISOString();
  }

  ngOnInit() {}
}
