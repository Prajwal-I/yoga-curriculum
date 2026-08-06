import { Component, inject, OnInit, ChangeDetectorRef, signal, effect, untracked } from '@angular/core';
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
  IonLabel,
  IonCard,
  IonCardContent,
  IonButton,
  IonSpinner,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Asanam } from '@core/models/asanam';
import { DatabaseService, Asanam as DbAsanam, AsanamStep as DbAsanamStep } from '@core/services/database.service';
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
    IonSpinner,
  ],
})
export class AsanamPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private db = inject(DatabaseService);

  selectedTab: string = 'steps';
  currentStepIndex = signal<number>(0);

  // State flags
  isLoading = true;
  hasError = false;
  errorMessage = '';

  // Navigation boundaries
  minSequenceId = 1;
  maxSequenceId = 1;
  currentSequenceId = 1;

  // Populated from DB
  protected asanam: Asanam | null = null;

  // Whether prev/next buttons are at boundary
  get isFirstAsanam(): boolean {
    return this.currentSequenceId <= this.minSequenceId;
  }
  get isLastAsanam(): boolean {
    return this.currentSequenceId >= this.maxSequenceId;
  }

  constructor() {
    // Wait for DB to be initialized before loading data
    effect(() => {
      if (this.db.isDBInitialized()) {
        untracked(() => {
          this.loadAsanamData();
        });
      }
    });
  }

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('asanamSequenceId') || '1';
    this.currentSequenceId = parseInt(paramId, 10) || 1;
  }

  // ---------------------------------------------------------------------------
  // Data loading
  // ---------------------------------------------------------------------------

  private async loadAsanamData() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    try {
      // Load navigation boundaries
      this.minSequenceId = await this.db.getMinSequenceId();
      this.maxSequenceId = await this.db.getMaxSequenceId();

      // Load asanam by sequence ID
      const dbAsanam: DbAsanam | undefined =
        await this.db.loadAsanamBySequenceId(this.currentSequenceId);

      if (!dbAsanam) {
        this.hasError = true;
        this.errorMessage = `Asanam with sequence ID ${this.currentSequenceId} not found.`;
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      // Load steps for this asanam
      const dbSteps: DbAsanamStep[] =
        (await this.db.loadStepsByAsanamId(dbAsanam.asanam_id)) || [];

      // Parse the JSON timestamps from the DB text field
      let timestamps: string[][] = [];
      if (dbAsanam.asanam_audio_change_step_timestamps) {
        try {
          timestamps = JSON.parse(dbAsanam.asanam_audio_change_step_timestamps);
        } catch {
          console.warn('Could not parse asanam_audio_change_step_timestamps:', dbAsanam.asanam_audio_change_step_timestamps);
        }
      }

      // Assemble the view-model
      this.asanam = {
        asanam_id: dbAsanam.asanam_id,
        asanam_sequence_id: dbAsanam.asanam_sequence_id,
        no_of_cycles: dbAsanam.no_of_cycles,
        guided_instructions_audio_url: dbAsanam.guided_instructions_audio_url,
        asanam_video_url: dbAsanam.asanam_video_url,
        asanam_audio_change_step_timestamps: timestamps,
        steps: dbSteps.map(s => ({
          asanam_step_id: s.asanam_step_id,
          asanam_id: s.asanam_id,
          step_sequence_id: s.step_sequence_id,
          step_name: s.step_name,
          step_description: s.step_description,
          step_image_url: s.step_image_url,
        })),
      };

      // Reset step index when loading a new asanam
      this.currentStepIndex.set(0);

    } catch (error) {
      console.error('Error loading asanam data:', error);
      this.hasError = true;
      this.errorMessage = 'Failed to load asanam data. Please try again.';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  // Splash screens state
  showRestSplash = false;
  showCelebrationSplash = false;
  restCountdown = 5;
  private countdownInterval: any;

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------

  goToPrevious() {
    if (this.currentSequenceId > this.minSequenceId) {
      this.navigateToSequenceId(this.currentSequenceId - 1);
    }
  }

  goToNext() {
    if (this.currentSequenceId < this.maxSequenceId) {
      this.navigateToSequenceId(this.currentSequenceId + 1);
    }
  }

  /** Done advances to the next asanam or shows celebration if last */
  onDone() {
    if (this.isLastAsanam) {
      this.showCelebrationSplash = true;
      setTimeout(() => {
        this.showCelebrationSplash = false;
        this.router.navigate(['/home']);
      }, 4000);
    } else {
      this.showRestSplash = true;
      this.restCountdown = 5;
      
      this.countdownInterval = setInterval(() => {
        this.restCountdown--;
        if (this.restCountdown <= 0) {
          clearInterval(this.countdownInterval);
          this.showRestSplash = false;
          this.goToNext();
        }
      }, 1000);
    }
  }

  onSkip() {
    if (this.isLastAsanam) {
      this.router.navigate(['/home']);
    } else {
      this.goToNext();
    }
  }

  private navigateToSequenceId(id: number) {
    this.currentSequenceId = id;
    // Update the URL without full page reload
    this.router.navigate(['/asanam', id], { replaceUrl: true });
    this.loadAsanamData();
  }

  // ---------------------------------------------------------------------------
  // Tab & Step changes
  // ---------------------------------------------------------------------------

  onTabChange(event: any) {
    this.selectedTab = event.detail.value;
  }

  onStepChange(stepIndex: number) {
    this.currentStepIndex.set(stepIndex);
    this.cdr.detectChanges();
  }
}
