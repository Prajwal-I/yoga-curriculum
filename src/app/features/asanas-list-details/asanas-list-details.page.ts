import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-asanas-list-details',
  templateUrl: './asanas-list-details.page.html',
  styleUrls: ['./asanas-list-details.page.scss'],
  standalone: true,
  imports: [
    TranslatePipe,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonIcon,
    IonButton,
    RouterLink,
  ],
})
export class AsanasListDetailsPage implements OnInit {
  private translate = inject(TranslateService);
  //TODO: Replace with actual data model
  readonly asanasList = [
    {
      name: 'Tadasana',
      time: '2 mins',
      steps: 5,
      cycles: 1,
      imageUrl:
        'https://c.pxhere.com/images/07/fe/c187f7a51de5b5baf8377d5e941d-1434851.jpg!d',
    },
    {
      name: 'Vrikshasana',
      time: '3 mins',
      steps: 4,
      cycles: 2,
      imageUrl:
        'https://c.pxhere.com/images/07/fe/c187f7a51de5b5baf8377d5e941d-1434851.jpg!d',
    },
    {
      name: 'Adho Mukha Svanasana',
      time: '5 mins',
      steps: 6,
      cycles: 1,
      imageUrl:
        'https://c.pxhere.com/images/07/fe/c187f7a51de5b5baf8377d5e941d-1434851.jpg!d',
    },
    {
      name: 'Bhujangasana',
      time: '4 mins',
      steps: 5,
      cycles: 1,
      imageUrl:
        'https://c.pxhere.com/images/07/fe/c187f7a51de5b5baf8377d5e941d-1434851.jpg!d',
    },
    {
      name: 'Shavasana',
      time: '10 mins',
      steps: 3,
      cycles: 1,
      imageUrl:
        'https://c.pxhere.com/images/07/fe/c187f7a51de5b5baf8377d5e941d-1434851.jpg!d',
    },
  ];

  pranayamasList = [
    {
      name: 'Anulom Vilom',
      time: '10 mins',
      steps: 3,
      cycles: 1,
      imageUrl:
        'https://images.onlymyhealth.com/only-my-health-english/images/2024/12/02/article/image/mn-Kapalbhati-1733122346934.webp',
    },
    {
      name: 'Kapalbhati',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://images.onlymyhealth.com/only-my-health-english/images/2024/12/02/article/image/mn-Kapalbhati-1733122346934.webp',
    },
    {
      name: 'Bhramari',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://images.onlymyhealth.com/only-my-health-english/images/2024/12/02/article/image/mn-Kapalbhati-1733122346934.webp',
    },
    {
      name: 'Shambavi Mudra',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://images.onlymyhealth.com/only-my-health-english/images/2024/12/02/article/image/mn-Kapalbhati-1733122346934.webp',
    },
  ];

  constructor() { }

  ngOnInit() { }
}
