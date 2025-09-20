import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonCardHeader,
} from '@ionic/angular/standalone';
import {
  DetailedReportDay,
  sessionReport,
} from '@src/src/app/core/models/detailed-report-day';
import { h } from 'ionicons/dist/types/stencil-public-runtime';

@Component({
  selector: 'app-week-report-details',
  templateUrl: './week-report-details.component.html',
  styleUrls: ['./week-report-details.component.scss'],
  imports: [
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    DatePipe,
    NgClass,
  ],
})
export class WeekReportDetailsComponent implements OnInit {
  //TODO: Replace with data for the week selected by user.
  weekReportDetails: DetailedReportDay[] = [
    {
      date: '2025-09-07',
      isPracticeDone: true,
      sessionDetails: [
        {
          startTime: '2025-09-07T06:00:00',
          endTime: '2025-09-07T06:30:00',
          durationMinutes: 30,
        },
      ],
    },
    {
      date: '2025-09-08',
      isPracticeDone: false,
      sessionDetails: [],
    },
    {
      date: '2025-09-09',
      isPracticeDone: true,
      sessionDetails: [
        {
          startTime: '2025-09-09T07:00:00',
          endTime: '2025-09-09T07:20:00',
          durationMinutes: 20,
        },
        {
          startTime: '2025-09-09T18:00:00',
          endTime: '2025-09-09T18:15:00',
          durationMinutes: 15,
        },
      ],
    },
    {
      date: '2025-09-10',
      isPracticeDone: true,
      sessionDetails: [
        {
          startTime: '2025-09-10T21:30:00',
          endTime: '2025-09-10T23:00:00',
          durationMinutes: 90,
        },
      ],
    },
    {
      date: '2025-09-11',
      isPracticeDone: false,
      sessionDetails: [],
    },
    {
      date: '2025-09-12',
      isPracticeDone: true,
      sessionDetails: [
        {
          startTime: '2025-09-12T08:00:00',
          endTime: '2025-09-12T08:25:00',
          durationMinutes: 25,
        },
        {
          startTime: '2025-09-12T16:00:00',
          endTime: '2025-09-12T18:25:00',
          durationMinutes: 145,
        },
        {
          startTime: '2025-09-12T05:00:00',
          endTime: '2025-09-12T06:25:00',
          durationMinutes: 25,
        },
      ],
    },
    {
      date: '2025-09-13',
      isPracticeDone: true,
      sessionDetails: [
        {
          startTime: '2025-09-13T06:15:00',
          endTime: '2025-09-13T06:45:00',
          durationMinutes: 30,
        },
      ],
    },
  ];

  constructor() {}

  ngOnInit() {}

  getClassNameBackground(session: sessionReport): string {
    let startTime: Date = new Date(session.startTime);
    let hours = startTime.getHours();
    //5 AM to 8 AM - dawn
    //8 AM to 5 PM - morning
    //5 PM to 8 PM - dusk
    //8 PM to 5 AM - night
    if (hours >= 5 && hours < 8) {
      return 'dawn-bg';
    } else if (hours >= 8 && hours < 17) {
      return 'morning-bg';
    } else if (hours >= 17 && hours < 20) {
      return 'dusk-bg';
    }
    return 'night-bg';
  }

  sessionTimeConvert(durationMinutes: number): string {
    if (durationMinutes < 60) {
      return `${durationMinutes}m`;
    } else {
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
    }
  }
}
