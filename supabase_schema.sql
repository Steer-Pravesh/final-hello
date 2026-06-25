-- PostgreSQL Schema for HelioSense Supabase Integration

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: profiles
-- Links to auth.users for role management and basic profile info
CREATE TABLE profiles (
    id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('coach', 'owner', 'parent')),
    avatar_tone TEXT DEFAULT 'tone-blue',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: athletes
-- Stores athletic indices and live metrics
CREATE TABLE athletes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    initials TEXT NOT NULL,
    age INTEGER NOT NULL,
    sport TEXT NOT NULL,
    position TEXT NOT NULL,
    batch TEXT NOT NULL,
    activity TEXT NOT NULL,
    risk TEXT NOT NULL CHECK (risk IN ('green', 'yellow', 'orange', 'red')),
    risk_score INTEGER NOT NULL,
    active_time TEXT NOT NULL,
    rest_time TEXT NOT NULL,
    hydration TEXT NOT NULL,
    intensity TEXT NOT NULL,
    alert TEXT,
    latest_action TEXT,
    issue_raised BOOLEAN DEFAULT FALSE,
    recovery INTEGER NOT NULL,
    fatigue INTEGER NOT NULL,
    sleep NUMERIC NOT NULL,
    readiness INTEGER NOT NULL,
    avatar_tone TEXT NOT NULL
);

-- Table: insights
-- AI generated recommendations and detail logs
CREATE TABLE insights (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    athlete_name TEXT NOT NULL,
    detail TEXT NOT NULL,
    risk TEXT NOT NULL,
    action TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Table: coaches
-- Directory listing batches and safety ratings
CREATE TABLE coaches (
    id SERIAL PRIMARY KEY,
    profile_id UUID REFERENCES profiles(id),
    name TEXT NOT NULL,
    active_batch TEXT NOT NULL,
    active_athletes INTEGER NOT NULL,
    compliance_score INTEGER NOT NULL
);

-- Row Level Security (RLS) Configuration
-- For a real production app, you would restrict these heavily based on role.
-- For this demo, we will enable public access to allow easy testing.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

-- Demo policies (Allow all for authenticated users)
CREATE POLICY "Allow full access to profiles for authenticated users" ON profiles FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to athletes for authenticated users" ON athletes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to insights for authenticated users" ON insights FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to coaches for authenticated users" ON coaches FOR ALL USING (auth.role() = 'authenticated');

-- Initial Seed Data (Optional, run after creating users)
-- You can manually insert initial athletes here matching the mock data if desired.
