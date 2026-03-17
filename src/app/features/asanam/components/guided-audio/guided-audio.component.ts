import { Component, input, output, computed, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, NgZone } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonRange, IonText, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { play, pause, playSkipForward, playSkipBack } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guided-audio',
  templateUrl: './guided-audio.component.html',
  styleUrls: ['./guided-audio.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonButton,
    IonIcon,
    IonRange,
    IonText,
    IonGrid,
    IonRow,
    IonCol
  ]
})
export class GuidedAudioComponent implements OnInit, OnDestroy {
  audioUrl = input<string>('');
  timestamps = input<string[][]>([]);
  stepChange = output<number>();

  audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  
  parsedTimestamps = computed(() => {
    const ts = this.timestamps();
    if (!ts) return [];
    return ts.map(t => {
      const parts = t[0].split(':');
      const time = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      return { time, step: parseInt(t[1], 10) - 1 };
    }).sort((a, b) => a.time - b.time);
  });
  lastEmittedStep: number = 0;

  constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    addIcons({ play, pause, playSkipForward, playSkipBack });
  }

  ngOnInit() {
    if (this.audioUrl()) {
      this.initAudio();
    }
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
  }

  initAudio() {
    this.audio = new Audio(this.audioUrl());

    this.audio.addEventListener('loadedmetadata', () => {
      this.ngZone.run(() => {
        this.duration = this.audio?.duration || 0;
        this.cdr.detectChanges();
      });
    });

    this.audio.addEventListener('timeupdate', () => {
      this.ngZone.run(() => {
        this.currentTime = this.audio?.currentTime || 0;
        this.checkTimestamps();
        this.cdr.detectChanges();
      });
    });

    this.audio.addEventListener('ended', () => {
      this.ngZone.run(() => {
        this.isPlaying = false;
        this.currentTime = 0;
        this.checkTimestamps();
        this.cdr.detectChanges();
      });
    });
  }

  checkTimestamps() {
    let currentStep = 0;
    const timestamps = this.parsedTimestamps();
    for (const ts of timestamps) {
      if (this.currentTime >= ts.time) {
        currentStep = ts.step;
      } else {
        break;
      }
    }
    
    if (currentStep !== this.lastEmittedStep) {
      console.log('Emitting step change:', currentStep);
      this.lastEmittedStep = currentStep;
      this.stepChange.emit(currentStep);
    }
  }

  togglePlayPause() {
    if (!this.audio) return;

    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  seekForward() {
    if (!this.audio) return;
    this.audio.currentTime = Math.min(this.audio.currentTime + 5, this.duration);
  }

  seekBackward() {
    if (!this.audio) return;
    this.audio.currentTime = Math.max(this.audio.currentTime - 5, 0);
  }

  onRangeChange(event: any) {
    if (!this.audio) return;
    const newValue = event.detail.value;
    this.audio.currentTime = newValue;
  }

  formatTime(seconds: number): string {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
