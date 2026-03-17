import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { AsanamStep } from '@core/models/asanam';

@Component({
  selector: 'app-asanam-steps',
  templateUrl: './asanam-steps.component.html',
  styleUrls: ['./asanam-steps.component.scss'],
  standalone: true,
  imports: [CommonModule, IonButton, IonIcon]
})
export class AsanamStepsComponent implements OnInit {
  @Input() steps: AsanamStep[] = [];
  currentIndex: number = 0;

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit() { }

  prevStep() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  nextStep() {
    if (this.currentIndex < this.steps.length - 1) {
      this.currentIndex++;
    }
  }
}
