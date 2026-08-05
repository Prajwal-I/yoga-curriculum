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
      console.log('--- Testing Yoga Curriculum Database ---');

      // Load and log all asanams
      await this.db.loadAsanams();
      const asanams = this.db.getAsanams();
      console.log('📿 Asanams:', asanams);

      // For each asanam, load its steps
      if (asanams) {
        for (const asanam of asanams) {
          const steps = await this.db.loadStepsByAsanamId(asanam.asanam_id);
          console.log(`  🧘 Steps for "${asanam.asanam_id}" (sequence ${asanam.asanam_sequence_id}):`, steps);
        }
      }

      // Load and log all asanam steps
      await this.db.loadAsanamSteps();
      console.log('🦶 All Asanam Steps:', this.db.getAsanamSteps());

      // Load and log yoga sessions
      await this.db.loadYogaSessions();
      console.log('📅 Yoga Sessions:', this.db.getYogaSessions());

      console.log('--- Database Test Completed ---');
    } catch (error) {
      console.error('Error testing yoga curriculum database:', error);
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
