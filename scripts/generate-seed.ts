/**
 * generate-seed.ts
 * ================
 * Build-time script that reads CSV files from src/data/ and generates
 * src/sql/seed.sql with INSERT OR IGNORE statements.
 *
 * Usage:  npx tsx scripts/generate-seed.ts
 * Hook :  Runs automatically via `npm run prebuild`
 *
 * No external CSV parsing libraries — uses a simple RFC-4180-aware parser
 * that handles quoted fields containing commas and newlines.
 */

import * as fs from 'fs';
import * as path from 'path';

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DATA_DIR     = path.join(PROJECT_ROOT, 'src', 'data');
const OUTPUT_FILE  = path.join(PROJECT_ROOT, 'src', 'sql', 'seed.sql');

// ---------------------------------------------------------------------------
// CSV table definitions — order matters (parent tables first for FK safety)
// ---------------------------------------------------------------------------
interface TableDef {
  /** Name of the SQLite table */
  table: string;
  /** CSV filename inside src/data/ */
  csv: string;
  /** Column names (must match CSV header order) */
  columns: string[];
  /** Columns that hold integer values (all others are treated as TEXT) */
  integerColumns: string[];
}

const TABLES: TableDef[] = [
  {
    table: 'asanams',
    csv: 'asanams.csv',
    columns: [
      'asanam_id',
      'asanam_sequence_id',
      'no_of_cycles',
      'guided_instructions_audio_url',
      'asanam_video_url',
      'asanam_audio_change_step_timestamps',
    ],
    integerColumns: ['asanam_id', 'asanam_sequence_id', 'no_of_cycles'],
  },
  {
    table: 'asanam_steps',
    csv: 'asanam_steps.csv',
    columns: [
      'asanam_step_id',
      'asanam_id',
      'step_sequence_id',
      'step_name',
      'step_description',
      'step_image_url',
    ],
    integerColumns: ['asanam_step_id', 'asanam_id', 'step_sequence_id'],
  },
];

// ---------------------------------------------------------------------------
// Minimal RFC-4180 CSV parser
// ---------------------------------------------------------------------------
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0;

  while (i < text.length) {
    const row: string[] = [];
    // Parse each field in the row
    while (i < text.length) {
      let field: string;

      if (text[i] === '"') {
        // Quoted field — consume until closing quote
        i++; // skip opening quote
        let value = '';
        while (i < text.length) {
          if (text[i] === '"') {
            if (i + 1 < text.length && text[i + 1] === '"') {
              // Escaped quote
              value += '"';
              i += 2;
            } else {
              // End of quoted field
              i++; // skip closing quote
              break;
            }
          } else {
            value += text[i];
            i++;
          }
        }
        field = value;
      } else {
        // Unquoted field — read until comma or EOL
        let value = '';
        while (i < text.length && text[i] !== ',' && text[i] !== '\n' && text[i] !== '\r') {
          value += text[i];
          i++;
        }
        field = value;
      }

      row.push(field);

      // After a field: comma → next field, newline → end of row
      if (i < text.length && text[i] === ',') {
        i++; // skip comma, continue to next field
      } else {
        // End of row — skip \r\n or \n
        if (i < text.length && text[i] === '\r') { i++; }
        if (i < text.length && text[i] === '\n') { i++; }
        break;
      }
    }

    // Skip fully empty rows (e.g. trailing newline)
    if (row.length === 1 && row[0] === '') { continue; }

    rows.push(row);
  }

  return rows;
}

// ---------------------------------------------------------------------------
// SQL value escaping
// ---------------------------------------------------------------------------
function sqlEscape(value: string): string {
  // Escape single quotes by doubling them
  return value.replace(/'/g, "''");
}

// ---------------------------------------------------------------------------
// Generate INSERT statements for one table
// ---------------------------------------------------------------------------
function generateInserts(def: TableDef): string {
  const csvPath = path.join(DATA_DIR, def.csv);

  if (!fs.existsSync(csvPath)) {
    console.warn(`⚠  CSV file not found, skipping: ${csvPath}`);
    return '';
  }

  const raw = fs.readFileSync(csvPath, 'utf-8');
  const rows = parseCsv(raw);

  if (rows.length < 2) {
    console.warn(`⚠  CSV file has no data rows, skipping: ${def.csv}`);
    return '';
  }

  // First row is the header — validate it matches expected columns
  const header = rows[0];
  const dataRows = rows.slice(1);

  for (let ci = 0; ci < def.columns.length; ci++) {
    if (header[ci] !== def.columns[ci]) {
      console.error(
        `✘  Column mismatch in ${def.csv}: expected "${def.columns[ci]}" at position ${ci}, got "${header[ci]}"`
      );
      process.exit(1);
    }
  }

  const lines: string[] = [];
  lines.push(`-- ${def.table}`);
  lines.push(`-- Generated from ${def.csv}`);
  lines.push('-- ---------------------------------------------------------------');
  lines.push(`INSERT OR IGNORE INTO ${def.table} (`);
  lines.push(`    ${def.columns.join(', ')}`);
  lines.push(') VALUES');

  const valueClauses: string[] = [];

  for (const row of dataRows) {
    const values: string[] = [];

    for (let ci = 0; ci < def.columns.length; ci++) {
      const colName = def.columns[ci];
      const rawValue = (row[ci] ?? '').trim();

      if (rawValue === '') {
        values.push('NULL');
      } else if (def.integerColumns.includes(colName)) {
        values.push(rawValue);
      } else {
        values.push(`'${sqlEscape(rawValue)}'`);
      }
    }

    valueClauses.push(`(${values.join(', ')})`);
  }

  lines.push(valueClauses.join(',\n'));
  lines.push(';');
  lines.push('');

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
function main() {
  console.log('🌱 Generating seed.sql from CSV files...\n');

  const sections: string[] = [];

  // File header
  sections.push(
    '-- =============================================================================',
    '-- Yoga Curriculum App — Seed Data (DML)',
    '-- =============================================================================',
    '-- AUTO-GENERATED by scripts/generate-seed.ts',
    '-- DO NOT EDIT THIS FILE MANUALLY — edit the CSV files in src/data/ instead.',
    `-- Generated at: ${new Date().toISOString()}`,
    '-- =============================================================================',
    '',
  );

  // Generate inserts for each table
  for (const def of TABLES) {
    const sql = generateInserts(def);
    if (sql) {
      sections.push(sql);
    }
  }

  const output = sections.join('\n');
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');

  console.log(`✔  Wrote ${OUTPUT_FILE}`);
  console.log(`   Tables: ${TABLES.map(t => t.table).join(', ')}`);
  console.log('');
}

main();
