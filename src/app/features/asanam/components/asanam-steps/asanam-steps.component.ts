import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/angular/standalone';

@Component({
  selector: 'app-asanam-steps',
  templateUrl: './asanam-steps.component.html',
  styleUrls: ['./asanam-steps.component.scss'],
  standalone: true,
  imports: [CommonModule, IonList, IonItem, IonLabel, IonThumbnail]
})
export class AsanamStepsComponent implements OnInit {
  @Input() steps: any[] = [];

  constructor() { }

  ngOnInit() { }

}
