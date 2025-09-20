import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { MonthReportDetailsComponent } from './components/month-report-details/month-report-details.component';
import { WeekReportDetailsComponent } from './components/week-report-details/week-report-details.component';

@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.page.html',
  styleUrls: ['./detailed-report.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    MonthReportDetailsComponent,
    WeekReportDetailsComponent,
  ],
})
export class DetailedReportPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
