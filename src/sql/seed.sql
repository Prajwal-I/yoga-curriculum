-- =============================================================================
-- Yoga Curriculum App — Seed Data (DML)
-- =============================================================================
-- Executed once after the schema DDL to populate the database with initial
-- curriculum content.  Re-running this file is safe because every INSERT
-- uses "INSERT OR IGNORE" to avoid duplicate-key errors.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Asanams
-- -----------------------------------------------------------------------------
INSERT OR IGNORE INTO asanams (
    asanam_id,
    asanam_sequence_id,
    no_of_cycles,
    guided_instructions_audio_url,
    asanam_video_url,
    asanam_audio_change_step_timestamps
) VALUES
(1, 1, 12,
 'assets/audio/surya_namaskar_guide.mp3',
 'assets/video/surya_namaskar_demo.mp4',
 '[[0.0, 4.5], [4.5, 9.0], [9.0, 14.2], [14.2, 19.8], [19.8, 25.0]]'),

(2, 2, 1,
 'assets/audio/padmasana_guide.mp3',
 'assets/video/padmasana_demo.mp4',
 '[[0.0, 6.0], [6.0, 12.5], [12.5, 20.0]]'),

(3, 3, 3,
 'assets/audio/trikonasana_guide.mp3',
 'assets/video/trikonasana_demo.mp4',
 '[[0.0, 5.0], [5.0, 10.5], [10.5, 16.0], [16.0, 22.0]]');

-- -----------------------------------------------------------------------------
-- Asanam Steps  —  Surya Namaskar (asanam_id = 1)
-- -----------------------------------------------------------------------------
INSERT OR IGNORE INTO asanam_steps (
    asanam_step_id, asanam_id, step_sequence_id,
    step_name, step_description, step_image_url
) VALUES
(1, 1, 1,
 'Pranamasana (Prayer Pose)',
 'Stand at the edge of your mat, keep your feet together and balance your weight equally on both feet. Expand your chest and relax your shoulders. Breathe in and lift both arms up from the sides. Exhale and bring your palms together in front of the chest in a prayer position.',
 'assets/images/surya_namaskar/step_01_pranamasana.png'),

(2, 1, 2,
 'Hastauttanasana (Raised Arms Pose)',
 'Breathe in and lift the arms up and back, keeping the biceps close to the ears. Stretch the whole body up from the heels to the tips of the fingers.',
 'assets/images/surya_namaskar/step_02_hastauttanasana.png'),

(3, 1, 3,
 'Hastapadasana (Standing Forward Bend)',
 'Breathe out and bend forward from the waist keeping the spine erect. Bring the hands down to the floor beside the feet.',
 'assets/images/surya_namaskar/step_03_hastapadasana.png'),

(4, 1, 4,
 'Ashwa Sanchalanasana (Equestrian Pose)',
 'Breathe in and push your right leg back as far as possible. Bring the right knee to the floor and look up.',
 'assets/images/surya_namaskar/step_04_ashwa_sanchalanasana.png'),

(5, 1, 5,
 'Dandasana (Stick Pose)',
 'Breathe in and take the left leg back, bringing the whole body in a straight line.',
 'assets/images/surya_namaskar/step_05_dandasana.png');

-- -----------------------------------------------------------------------------
-- Asanam Steps  —  Padmasana (asanam_id = 2)
-- -----------------------------------------------------------------------------
INSERT OR IGNORE INTO asanam_steps (
    asanam_step_id, asanam_id, step_sequence_id,
    step_name, step_description, step_image_url
) VALUES
(6, 2, 1,
 'Seated Position',
 'Sit on the floor with legs stretched out in front of you, spine erect.',
 'assets/images/padmasana/step_01_seated.png'),

(7, 2, 2,
 'Half Lotus',
 'Bend the right knee and place the right foot on the left thigh. The sole should face upward and the heel close to the abdomen.',
 'assets/images/padmasana/step_02_half_lotus.png'),

(8, 2, 3,
 'Full Lotus',
 'Repeat with the left leg, placing the left foot on the right thigh. With both legs crossed and feet on opposite thighs, place the hands on the knees in mudra position.',
 'assets/images/padmasana/step_03_full_lotus.png');

-- -----------------------------------------------------------------------------
-- Asanam Steps  —  Trikonasana (asanam_id = 3)
-- -----------------------------------------------------------------------------
INSERT OR IGNORE INTO asanam_steps (
    asanam_step_id, asanam_id, step_sequence_id,
    step_name, step_description, step_image_url
) VALUES
(9, 3, 1,
 'Standing Wide-Legged',
 'Stand straight with your feet wide apart (about 3-4 feet). Turn your right foot out 90 degrees and left foot in by about 15 degrees.',
 'assets/images/trikonasana/step_01_standing.png'),

(10, 3, 2,
 'Arms Extended',
 'Raise both arms to shoulder height, parallel to the floor, palms facing downward.',
 'assets/images/trikonasana/step_02_arms_extended.png'),

(11, 3, 3,
 'Lateral Bend',
 'Exhale and bend your body to the right from the hips. Let the right hand touch the right ankle while extending the left arm straight up toward the ceiling.',
 'assets/images/trikonasana/step_03_lateral_bend.png'),

(12, 3, 4,
 'Hold and Return',
 'Hold the pose while stretching. Look up at the left palm. Inhale and come up slowly. Repeat on the other side.',
 'assets/images/trikonasana/step_04_hold_return.png');

-- -----------------------------------------------------------------------------
-- Yoga Sessions (sample entries)
-- -----------------------------------------------------------------------------
INSERT OR IGNORE INTO yoga_sessions (
    yoga_session_id, is_yoga_session_start, yoga_session_timestamp
) VALUES
(1, 1, '2026-08-05T06:00:00'),
(2, 0, '2026-08-05T06:45:00');
