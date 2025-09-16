import { Component, inject } from '@angular/core';
import {
  RefresherCustomEvent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRefresher,
  IonRefresherContent,
  IonList,
} from '@ionic/angular/standalone';

import {
  DataService,
  Message,
} from '@src/src/app/core/services/api/data.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WeeklyReportComponent } from './components/weekly-report/weekly-report.component';
import { StartYogaCardComponent } from './components/start-yoga-card/start-yoga-card.component';
import { PatanjaliMaharishiStatueComponent } from './components/patanjali-maharishi-statue/patanjali-maharishi-statue.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRefresher,
    IonRefresherContent,
    IonList,
    TranslatePipe,
    WeeklyReportComponent,
    StartYogaCardComponent,
    PatanjaliMaharishiStatueComponent,
  ],
})
export class HomePage {
  private data = inject(DataService);
  private translate = inject(TranslateService);

  constructor() {
    this.translate.use('tl');
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
