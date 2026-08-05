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
      console.log('--- Testing SQLite Database ---');
      await this.db.addUser('test 1');
      await this.db.addUser('test 2');
      console.log('Users in database:', this.db.getUsers());
      console.log('--- Database Test Completed ---');
      await this.db.clearUsersTable();
    } catch (error) {
      console.error('Error testing SQLite database:', error);
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
