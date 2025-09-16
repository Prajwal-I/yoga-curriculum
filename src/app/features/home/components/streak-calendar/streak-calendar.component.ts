import { Component, OnInit } from '@angular/core';
import { StreakDay, DayName } from '@src/src/app/core/models/streak-calendar';

@Component({
  selector: 'app-streak-calendar',
  templateUrl: './streak-calendar.component.html',
  styleUrls: ['./streak-calendar.component.scss'],
})
export class StreakCalendarComponent implements OnInit {
  //TODO: Replace with input - to be passed from parent component (weekly-report)
  weekCalendar: StreakDay[] = [
    { dayName: DayName.Sunday, pacticeDone: false },
    { dayName: DayName.Monday, pacticeDone: true },
    { dayName: DayName.Tuesday, pacticeDone: false },
    { dayName: DayName.Wednesday, pacticeDone: false },
    { dayName: DayName.Thursday, pacticeDone: true },
    { dayName: DayName.Friday, pacticeDone: true },
    { dayName: DayName.Saturday, pacticeDone: false },
  ];

  todayName: string = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
  });

  constructor() {}

  ngOnInit() {}
}
