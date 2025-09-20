export interface DetailedReportDay {
  date: string; // ISO date string
  isPracticeDone: boolean;
  sessionDetails: sessionReport[];
}

export interface sessionReport {
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  durationMinutes: number;
}
