CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role VARCHAR(50),
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password_hash TEXT,
  father VARCHAR(100),
  mother VARCHAR(100),
  tribe VARCHAR(50),
  clan VARCHAR(50),
  birth_place VARCHAR(100),
  birth_date DATE,
  sub_county VARCHAR(100),
  residence VARCHAR(150),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE baptism (
  baptism_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  baptism_place VARCHAR(100),
  baptism_date DATE,
  baptised_by VARCHAR(100),
  administrator VARCHAR(100)
);
CREATE TABLE eucharist (
  eucharist_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  eucharist_place VARCHAR(100),
  eucharist_date DATE
);
CREATE TABLE confirmation (
  confirmation_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  confirmation_place VARCHAR(100),
  confirmation_date DATE,
  confirmation_no VARCHAR(50)
);
CREATE TABLE marriage (
  marriage_id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  spouse_name VARCHAR(100),
  marriage_place VARCHAR(100),
  marriage_date DATE,
  marriage_no VARCHAR(50)
);
