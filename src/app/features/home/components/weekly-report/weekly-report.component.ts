import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { StreakCalendarComponent } from '../streak-calendar/streak-calendar.component';

@Component({
  selector: 'app-weekly-report',
  templateUrl: './weekly-report.component.html',
  styleUrls: ['./weekly-report.component.scss'],
  imports: [
    TranslatePipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    StreakCalendarComponent,
  ],
})
export class WeeklyReportComponent implements OnInit {
  private translate = inject(TranslateService);

  streakDays: string = '5';

  constructor() {}

  ngOnInit() {}
}
