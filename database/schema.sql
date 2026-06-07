-- ============================================================
-- AddaSmriti X - Complete Database Schema
-- PostgreSQL 15+
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";  -- for fuzzy text search

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email               VARCHAR(255) UNIQUE NOT NULL,
    password_hash       VARCHAR(255) NOT NULL,
    full_name           VARCHAR(255) NOT NULL,
    phone               VARCHAR(20),
    date_of_birth       DATE,
    preferred_language  VARCHAR(10) DEFAULT 'en',
    avatar_url          TEXT,
    bio                 TEXT,
    location            VARCHAR(255),
    is_elder            BOOLEAN DEFAULT FALSE,
    is_verified         BOOLEAN DEFAULT FALSE,
    digital_twin_id     UUID,
    follower_count      INTEGER DEFAULT 0,
    following_count     INTEGER DEFAULT 0,
    memory_count        INTEGER DEFAULT 0,
    status              VARCHAR(20) DEFAULT 'active',
    last_login          TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_elder ON users(is_elder) WHERE is_elder = TRUE;

-- ============================================================
-- DIGITAL TWINS
-- ============================================================
CREATE TABLE digital_twins (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id             UUID REFERENCES users(id) ON DELETE CASCADE,
    twin_name           VARCHAR(255) NOT NULL,
    voice_model_id      VARCHAR(255),
    personality_profile JSONB DEFAULT '{}',
    speaking_style      JSONB DEFAULT '{}',
    dialect_features    JSONB DEFAULT '{}',
    emotion_patterns    JSONB DEFAULT '{}',
    memory_count        INTEGER DEFAULT 0,
    training_status     VARCHAR(50) DEFAULT 'pending',
    model_version       VARCHAR(20),
    avatar_url          TEXT,
    last_trained_at     TIMESTAMP,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_twins_user ON digital_twins(user_id);

-- ============================================================
-- MEMORIES
-- ============================================================
CREATE TABLE memories (
    id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id                 UUID REFERENCES users(id) ON DELETE CASCADE,
    title                   VARCHAR(500) NOT NULL,
    content                 TEXT NOT NULL,
    memory_type             VARCHAR(50) NOT NULL,
    time_period             VARCHAR(100),
    exact_date              DATE,
    location_name           VARCHAR(255),
    location_city           VARCHAR(100),
    location_state          VARCHAR(100),
    location_country        VARCHAR(100) DEFAULT 'India',
    location_lat            DECIMAL(10,8),
    location_lng            DECIMAL(11,8),
    location_historical_sig TEXT,
    emotion_tags            TEXT[] DEFAULT '{}',
    people_mentioned        TEXT[] DEFAULT '{}',
    places_mentioned        TEXT[] DEFAULT '{}',
    cultural_significance   SMALLINT DEFAULT 5 CHECK (cultural_significance BETWEEN 1 AND 10),
    language                VARCHAR(10) DEFAULT 'en',
    audio_url               TEXT,
    video_url               TEXT,
    images                  JSONB DEFAULT '[]',
    transcript              TEXT,
    ai_summary              TEXT,
    metadata                JSONB DEFAULT '{}',
    embedding_vector        JSONB,
    view_count              INTEGER DEFAULT 0,
    like_count              INTEGER DEFAULT 0,
    share_count             INTEGER DEFAULT 0,
    comment_count           INTEGER DEFAULT 0,
    preservation_status     VARCHAR(50) DEFAULT 'draft',
    is_public               BOOLEAN DEFAULT FALSE,
    is_featured             BOOLEAN DEFAULT FALSE,
    created_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at              TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_memories_user ON memories(user_id);
CREATE INDEX idx_memories_type ON memories(memory_type);
CREATE INDEX idx_memories_language ON memories(language);
CREATE INDEX idx_memories_public ON memories(is_public, created_at DESC) WHERE is_public = TRUE;
CREATE INDEX idx_memories_location ON memories(location_city, location_country);
CREATE INDEX idx_memories_significance ON memories(cultural_significance DESC);
CREATE INDEX idx_memories_title_fts ON memories USING gin(to_tsvector('english', title || ' ' || content));
CREATE INDEX idx_memories_title_trgm ON memories USING gin(title gin_trgm_ops);

-- ============================================================
-- COMMUNITIES
-- ============================================================
CREATE TABLE communities (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE,
    description     TEXT,
    community_type  VARCHAR(50) NOT NULL,
    location_city   VARCHAR(100),
    cover_image     TEXT,
    icon_emoji      VARCHAR(10) DEFAULT '🏛️',
    member_count    INTEGER DEFAULT 0,
    memory_count    INTEGER DEFAULT 0,
    privacy         VARCHAR(20) DEFAULT 'public',
    created_by      UUID REFERENCES users(id),
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_communities_type ON communities(community_type);
CREATE INDEX idx_communities_city ON communities(location_city);

CREATE TABLE community_members (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id    UUID REFERENCES communities(id) ON DELETE CASCADE,
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    role            VARCHAR(50) DEFAULT 'member',
    joined_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(community_id, user_id)
);

-- ============================================================
-- MEMORY LIKES / BOOKMARKS
-- ============================================================
CREATE TABLE memory_likes (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memory_id   UUID REFERENCES memories(id) ON DELETE CASCADE,
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(memory_id, user_id)
);

CREATE TABLE memory_bookmarks (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    memory_id   UUID REFERENCES memories(id) ON DELETE CASCADE,
    user_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(memory_id, user_id)
);

-- ============================================================
-- AI GENERATION JOBS
-- ============================================================
CREATE TABLE ai_jobs (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    job_type        VARCHAR(50) NOT NULL,
    status          VARCHAR(50) DEFAULT 'pending',
    progress        SMALLINT DEFAULT 0,
    input_data      JSONB DEFAULT '{}',
    output_url      TEXT,
    error_message   TEXT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at    TIMESTAMP
);
CREATE INDEX idx_ai_jobs_user ON ai_jobs(user_id, created_at DESC);

-- ============================================================
-- FOLLOWS
-- ============================================================
CREATE TABLE user_follows (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    follower_id     UUID REFERENCES users(id) ON DELETE CASCADE,
    following_id    UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(follower_id, following_id)
);

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = CURRENT_TIMESTAMP; RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_memories_updated BEFORE UPDATE ON memories FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-update user memory_count
CREATE OR REPLACE FUNCTION update_user_memory_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN UPDATE users SET memory_count = memory_count + 1 WHERE id = NEW.user_id;
    ELSIF TG_OP = 'DELETE' THEN UPDATE users SET memory_count = memory_count - 1 WHERE id = OLD.user_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_memory_count AFTER INSERT OR DELETE ON memories
    FOR EACH ROW EXECUTE FUNCTION update_user_memory_count();

-- ============================================================
-- SEED DATA
-- ============================================================
INSERT INTO users (email, password_hash, full_name, preferred_language, is_elder, bio) VALUES
    ('demo@addasmriti.com',  crypt('demo123',  gen_salt('bf')), 'Demo User',     'en', FALSE, 'Exploring heritage preservation'),
    ('elder@addasmriti.com', crypt('elder123', gen_salt('bf')), 'Ramesh Kumar',  'bn', TRUE,  'Kolkata native, 70 years of memories'),
    ('priya@addasmriti.com', crypt('priya123', gen_salt('bf')), 'Priya Sharma',  'hi', FALSE, 'Documenting family stories');

INSERT INTO communities (name, slug, description, community_type, location_city, icon_emoji) VALUES
    ('Kolkata Heritage Circle',  'kolkata-heritage',  'Preserving the stories of the City of Joy',   'city',    'Kolkata',  '🏛️'),
    ('Bengali Food Traditions',  'bengali-food',      'Recipes and food memories from Bengal',       'culture', NULL,       '🍛'),
    ('Partition Memories 1947',  'partition-1947',    'Stories from the great partition era',        'history', NULL,       '📜'),
    ('Durga Puja Chronicles',    'durga-puja',        'Festival memories across generations',        'festival',NULL,       '🎉');
