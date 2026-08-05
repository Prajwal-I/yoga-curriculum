-- =============================================================================
-- Yoga Curriculum App — SQLite Schema
-- =============================================================================
-- This DDL is executed once during app installation to bootstrap the local
-- SQLite database on the client device.
--
-- Notes:
--   • SQLite has no native ARRAY type.  `asanam_audio_change_step_timestamps`
--     is stored as a JSON TEXT value  (e.g. [[0.0, 5.2], [5.2, 12.0]]).
--   • BOOLEAN is stored as INTEGER (0 = false, 1 = true).
--   • TIMESTAMP is stored as TEXT in ISO-8601 format.
--   • Foreign-key enforcement requires  PRAGMA foreign_keys = ON;  at runtime.
-- =============================================================================

PRAGMA foreign_keys = ON;

-- -----------------------------------------------------------------------------
-- Asanams (yoga poses / asanas)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS asanams (
    asanam_id                           INTEGER PRIMARY KEY,
    asanam_sequence_id                  INTEGER NOT NULL,
    no_of_cycles                        INTEGER NOT NULL DEFAULT 1,
    -- Path to the guided-instructions audio clip on the local file system
    guided_instructions_audio_url       TEXT,
    -- Path to the asana demonstration video on the local file system
    asanam_video_url                    TEXT,
    -- JSON 2-D array of audio timestamps that mark step transitions
    -- Example: [[0.0, 5.2], [5.2, 12.0]]
    asanam_audio_change_step_timestamps TEXT
);

-- -----------------------------------------------------------------------------
-- Asanam Steps (individual steps within an asana)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS asanam_steps (
    asanam_step_id   INTEGER PRIMARY KEY,
    asanam_id        INTEGER NOT NULL,
    step_sequence_id INTEGER NOT NULL,
    step_name        TEXT    NOT NULL,
    step_description TEXT,
    -- Path to the step illustration image on the local file system
    step_image_url   TEXT,

    FOREIGN KEY (asanam_id) REFERENCES asanams (asanam_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- -----------------------------------------------------------------------------
-- Yoga Sessions (tracking session start events)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS yoga_sessions (
    yoga_session_id        INTEGER PRIMARY KEY,
    is_yoga_session_start  INTEGER NOT NULL DEFAULT 0,   -- 0 = false, 1 = true
    yoga_session_timestamp TEXT    NOT NULL DEFAULT (datetime('now'))
);
