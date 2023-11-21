CREATE TYPE IF NOT EXISTS OperatingSystem AS ENUM ('Windows', 'Linux', 'MacOS', 'Other');

CREATE TABLE IF NOT EXISTS reports (
    id                          bigserial       primary key,
    username                    varchar(50),
    game_id                     bigint          NOT NULL references games (id),
    operating_system            OperatingSystem NOT NULL,
    operating_system_version    varchar(50)     NOT NULL,
    kernel_version              varchar(50),
    processor                   varchar(50)     NOT NULL,
    graphics_card               varchar(50)     NOT NULL,
    random_access_memory        varchar(20)     NOT NULL,
    average_frames_per_second   smallint        NOT NULL CHECK (average_frames_per_second > 0),
    resolution_width            smallint        NOT NULL CHECK (resolution_width > 0),
    resolution_height           smallint        NOT NULL CHECK (resolution_height > 0),
    comments                    varchar(255),
    created_at                  timestamptz     NOT NULL DEFAULT now(),
    updated_at                  timestamptz     NOT NULL DEFAULT now()
);