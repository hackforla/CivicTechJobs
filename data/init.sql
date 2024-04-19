CREATE SCHEMA PostDatabase;


CREATE TABLE Post (
    id UUID PRIMARY KEY,
    role VARCHAR,
    subrole VARCHAR,
    project VARCHAR,
    meetings_times VARCHAR[],
    difficulty_level INT,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by_or_token VARCHAR
);