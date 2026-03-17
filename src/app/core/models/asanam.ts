export interface AsanamStep {
  step_sequence_id: number;
  step_name: string;
  step_description: string;
  step_image_url: string;
}

export interface Asanam {
  asanamSequenceId: number;
  asanam_name: string;
  no_of_cycles: number;
  steps: AsanamStep[];
  guided_instructions_audio_url: string;
  asanam_video_url: string;
  asanam_video_change_step_timestamps: string[][];
}
