CREATE TABLE reports (
    id                        INTEGER PRIMARY KEY AUTOINCREMENT,
    username                  TEXT,
    game_id                   INTEGER NOT NULL,
    operating_system          TEXT NOT NULL,
    operating_system_version  TEXT NOT NULL,
    kernel_version            TEXT,
    processor                 TEXT NOT NULL,
    graphics_card             TEXT NOT NULL,
    random_access_memory      TEXT NOT NULL,
    average_frames_per_second INTEGER NOT NULL CHECK (average_frames_per_second > 0),
    resolution_width          INTEGER NOT NULL CHECK (resolution_width > 0),
    resolution_height         INTEGER NOT NULL CHECK (resolution_height > 0),
    comments                  TEXT,
    created_at                DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX reports_game_id_index ON reports (game_id);
CREATE INDEX reports_username_index ON reports (username);

