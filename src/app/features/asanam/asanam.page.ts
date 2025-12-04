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
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { Asanam } from '../../core/models/asanam';

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
    ],
})
export class AsanamPage implements OnInit {
  private urlAsanamSequenceId!: string;
  private route = inject(ActivatedRoute);
  protected asanam: Asanam = {
    asanamSequenceId: 1,
    asanam_name: 'pranamasanam',
    no_of_cycles: 3,
    steps: [
      {
        step_sequence_id: 1,
        step_name: 'Starting Position',
        step_description:
          'Stand straight with feet together and arms at sides.',
        step_image_url: 'https://example.com/images/pranamasanam_step1.jpg',
      },
      {
        step_sequence_id: 2,
        step_name: 'Raise Arms',
        step_description:
          'Inhale and raise your arms sideways to shoulder height.',
        step_image_url: 'https://example.com/images/pranamasanam_step2.jpg',
      },
    ],
    guided_instructions_audio_url:
      'https://example.com/audios/pranamasanam_guide.mp3',
    asanam_video_url: 'https://example.com/videos/pranamasanam_demo.mp4',
  };

  ngOnInit() {
    this.urlAsanamSequenceId =
      this.route.snapshot.paramMap.get('asanamSequenceId') || '1';
  }
}
