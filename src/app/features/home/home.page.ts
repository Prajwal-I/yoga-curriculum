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
import { MessageComponent } from '@features/home/components/message/message.component';

import {
  DataService,
  Message,
} from '@src/src/app/core/services/api/data.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

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
    MessageComponent,
    TranslatePipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
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
