import { Component, effect, inject, untracked } from '@angular/core';
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

import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { WeeklyReportComponent } from './components/weekly-report/weekly-report.component';
import { StartYogaCardComponent } from './components/start-yoga-card/start-yoga-card.component';
import { PatanjaliMaharishiStatueComponent } from './components/patanjali-maharishi-statue/patanjali-maharishi-statue.component';
import { DatabaseService } from '../../core/services/database.service';

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
  private translate = inject(TranslateService);
  private db = inject(DatabaseService);

  constructor() {
    this.translate.use('tl');
    console.log("IN HOME COMPONENT", this.db.isDBInitialized());
    effect(() => {
      if (this.db.isDBInitialized()) {
        untracked(() => {
          this.testDatabase();
        });
      }
    });
  }

  private async testDatabase() {
    try {
      await this.db.loadAsanams();
      await this.db.loadAsanamSteps();
      await this.db.loadYogaSessions();

      const dump = {
        asanams: this.db.getAsanams(),
        asanam_steps: this.db.getAsanamSteps(),
        yoga_sessions: this.db.getYogaSessions(),
      };

      console.log('[DB DUMP]', JSON.stringify(dump, null, 2));
    } catch (error) {
      console.error('[DB DUMP ERROR]', error);
    }
  }

  setLanguage(lang: string) {
    this.translate.use(lang);
  }
  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }
}
