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
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixahive.com%2Fwp-content%2Fuploads%2F2021%2F02%2FAnulom-Vilom-Alternate-Nostril-Breathing-357382-pixahive-1024x643.jpg&f=1&nofb=1&ipt=f51468cf482dd6beb174881ce12c3cb0c3be9fe10b623950b0e42d42c8dbd2d8',
    },
    {
      name: 'Kapalbhati',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixahive.com%2Fwp-content%2Fuploads%2F2021%2F02%2FAnulom-Vilom-Alternate-Nostril-Breathing-357382-pixahive-1024x643.jpg&f=1&nofb=1&ipt=f51468cf482dd6beb174881ce12c3cb0c3be9fe10b623950b0e42d42c8dbd2d8',
    },
    {
      name: 'Bhramari',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixahive.com%2Fwp-content%2Fuploads%2F2021%2F02%2FAnulom-Vilom-Alternate-Nostril-Breathing-357382-pixahive-1024x643.jpg&f=1&nofb=1&ipt=f51468cf482dd6beb174881ce12c3cb0c3be9fe10b623950b0e42d42c8dbd2d8',
    },
    {
      name: 'Shambavi Mudra',
      time: '5 mins',
      steps: 4,
      cycles: 1,
      imageUrl:
        'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpixahive.com%2Fwp-content%2Fuploads%2F2021%2F02%2FAnulom-Vilom-Alternate-Nostril-Breathing-357382-pixahive-1024x643.jpg&f=1&nofb=1&ipt=f51468cf482dd6beb174881ce12c3cb0c3be9fe10b623950b0e42d42c8dbd2d8',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
