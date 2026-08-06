import { AsanamStep as DbAsanamStep } from '@core/services/database.service';

// Re-export the DB step type for use in components
export type AsanamStep = DbAsanamStep;

/**
 * View-model used by the AsanamPage and its child components.
 * Assembled from DB `asanams` + `asanam_steps` rows.
 */
export interface Asanam {
  asanam_id: number;
  asanam_sequence_id: number;
  no_of_cycles: number;
  steps: AsanamStep[];
  guided_instructions_audio_url: string;
  asanam_video_url: string;
  asanam_audio_change_step_timestamps: string[][];
}
