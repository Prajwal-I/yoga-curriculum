import { Component, input, model, OnInit } from '@angular/core';
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
  steps = input<AsanamStep[]>([]);
  currentIndex = model<number>(0);

  constructor() {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  ngOnInit() { }

  prevStep() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(i => i - 1);
    }
  }

  nextStep() {
    if (this.currentIndex() < this.steps().length - 1) {
      this.currentIndex.update(i => i + 1);
    }
  }

  setStep(index: number) {
    if (index >= 0 && index < this.steps().length) {
      this.currentIndex.set(index);
    }
  }
}
