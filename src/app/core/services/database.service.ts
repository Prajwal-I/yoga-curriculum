import { Injectable } from '@angular/core';
import { SQLiteConnection, CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { WritableSignal, signal } from '@angular/core';

const DB_NAME = 'yoga_curriculum_db';

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------
export interface Asanam {
  asanam_id: number;
  asanam_sequence_id: number;
  no_of_cycles: number;
  guided_instructions_audio_url: string;
  asanam_video_url: string;
  asanam_audio_change_step_timestamps: string;   // JSON text
}

export interface AsanamStep {
  asanam_step_id: number;
  asanam_id: number;
  step_sequence_id: number;
  step_name: string;
  step_description: string;
  step_image_url: string;
}

export interface YogaSession {
  yoga_session_id: number;
  is_yoga_session_start: number;                  // 0 | 1
  yoga_session_timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;

  // Signals ----------------------------------------------------------------
  private asanams: WritableSignal<Asanam[] | undefined> = signal<Asanam[] | undefined>(undefined);
  private asanamSteps: WritableSignal<AsanamStep[] | undefined> = signal<AsanamStep[] | undefined>(undefined);
  private yogaSessions: WritableSignal<YogaSession[] | undefined> = signal<YogaSession[] | undefined>(undefined);
  isDBInitialized: WritableSignal<boolean> = signal<boolean>(false);

  constructor() { }

  // =========================================================================
  // Initialisation
  // =========================================================================

  async initializePlugin() {
    this.db = await this.sqlite.createConnection(
      DB_NAME,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    // Enable foreign-key enforcement
    await this.db.execute('PRAGMA foreign_keys = ON;');

    // Execute DDL schema from sql/schema.sql
    const schemaSql = await this.loadSqlFile('sql/schema.sql');
    await this.db.execute(schemaSql);
    console.log('Schema created from sql/schema.sql');

    // Execute DML seed data from sql/seed.sql
    const seedSql = await this.loadSqlFile('sql/seed.sql');
    await this.db.execute(seedSql);
    console.log('Seed data inserted from sql/seed.sql');

    console.log('Database initialised with yoga curriculum schema');
    this.isDBInitialized.set(true);
    return true;
  }

  // =========================================================================
  // SQL file loader
  // =========================================================================

  /**
   * Fetches a .sql file from the app's bundled assets and returns its
   * contents as a string, with comment lines stripped out.
   */
  private async loadSqlFile(path: string): Promise<string> {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`Failed to load SQL file: ${path} (${response.status})`);
    }

    const raw = await response.text();

    // Strip SQL comment lines (-- ...) so only executable statements remain
    return raw
      .split('\n')
      .filter(line => !line.replace(/^\s+/, '').startsWith('--'))
      .join('\n');
  }

  // =========================================================================
  // Getters (signal-based)
  // =========================================================================

  getAsanams() {
    return this.asanams();
  }

  getAsanamSteps() {
    return this.asanamSteps();
  }

  getYogaSessions() {
    return this.yogaSessions();
  }

  // =========================================================================
  // Loaders
  // =========================================================================

  async loadAsanams() {
    const result = await this.db.query('SELECT * FROM asanams ORDER BY asanam_sequence_id');
    this.asanams.set(result.values);
  }

  async loadAsanamSteps() {
    const result = await this.db.query('SELECT * FROM asanam_steps ORDER BY asanam_id, step_sequence_id');
    this.asanamSteps.set(result.values);
  }

  async loadStepsByAsanamId(asanamId: number) {
    const result = await this.db.query(
      'SELECT * FROM asanam_steps WHERE asanam_id = ? ORDER BY step_sequence_id',
      [asanamId]
    );
    return result.values;
  }

  async loadYogaSessions() {
    const result = await this.db.query('SELECT * FROM yoga_sessions ORDER BY yoga_session_timestamp DESC');
    this.yogaSessions.set(result.values);
  }
}
