import { Component, inject, OnInit } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-start-yoga-card',
  templateUrl: './start-yoga-card.component.html',
  styleUrls: ['./start-yoga-card.component.scss'],
  imports: [
    TranslatePipe,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonButton,
    IonIcon,
  ],
})
export class StartYogaCardComponent implements OnInit {
  private translate = inject(TranslateService);

  //TODO: Replace with actual data
  yogaSessionTime: string = '15';

  constructor() {}

  ngOnInit() {}
}
