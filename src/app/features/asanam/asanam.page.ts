import { Component, inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonLabel,
  IonCard,
  IonCardContent,
  IonButton,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Asanam } from '@core/models/asanam';
import { GuidedAudioComponent } from './components/guided-audio/guided-audio.component';
import { AsanamStepsComponent } from './components/asanam-steps/asanam-steps.component';
import { AsanamVideoComponent } from './components/asanam-video/asanam-video.component';

@Component({
  selector: 'app-asanam',
  templateUrl: './asanam.page.html',
  styleUrls: ['./asanam.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    GuidedAudioComponent,
    AsanamStepsComponent,
    AsanamVideoComponent,
    IonCard,
    IonCardContent,
    IonButton,
  ],
})
export class AsanamPage implements OnInit {
  private urlAsanamSequenceId!: string;
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  selectedTab: string = 'steps';
  currentStepIndex = signal<number>(0);

  protected asanam: Asanam = {
    asanamSequenceId: 1,
    asanam_name: 'pranamasanam',
    no_of_cycles: 3,
    steps: [
      {
        step_sequence_id: 1,
        step_name: 'Starting Position',
        step_description: 'Stand straight with feet together and arms at sides.',
        step_image_url: 'https://gifdb.com/images/high/yoga-sun-salutation-cartoon-wc997kkjfpx15a2p.gif',
      },
      {
        step_sequence_id: 2,
        step_name: 'Raise Arms',
        step_description: 'Inhale and raise your arms sideways to shoulder height.',
        step_image_url: 'https://media1.tenor.com/m/fdZuoewysXAAAAAd/yoga-nayanthara.gif',
      },
      {
        step_sequence_id: 3,
        step_name: 'Step Back',
        step_description: 'Inhale and raise your arms sideways to shoulder height.',
        step_image_url: 'https://i.gifer.com/XFT6.gif',
      }, {
        step_sequence_id: 4,
        step_name: 'Step Forward',
        step_description: 'Inhale and raise your arms sideways to shoulder height.',
        step_image_url: 'https://gifdb.com/images/high/yoga-sun-salutation-cartoon-wc997kkjfpx15a2p.gif',
      },
    ],
    guided_instructions_audio_url: 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg',
    asanam_video_url: 'https://www.youtube.com/watch?v=W6aon9e0GeM',
    asanam_video_change_step_timestamps: [['0:05', '2'], ['0:15', '3'], ['1:20', '4']]
  };

  ngOnInit() {
    this.urlAsanamSequenceId =
      this.route.snapshot.paramMap.get('asanamSequenceId') || '1';
  }

  onTabChange(event: any) {
    this.selectedTab = event.detail.value;
  }

  onStepChange(stepIndex: number) {
    this.currentStepIndex.set(stepIndex);
    this.cdr.detectChanges();
  }
}
