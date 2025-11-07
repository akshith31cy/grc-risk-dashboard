// src/config/database.ts
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.resolve(__dirname, '../../database'); // server/database

// Ensure the path exists and is a directory
if (fs.existsSync(dbDir)) {
  const stat = fs.statSync(dbDir);
  if (!stat.isDirectory()) {
    throw new Error(
      `Path exists but is not a directory: ${dbDir}. ` +
      `Delete/rename the file named "database" and re-run.`
    );
  }
} else {
  fs.mkdirSync(dbDir, { recursive: true }); // create folder tree safely
}

const dbPath = path.join(dbDir, 'grc.db');
console.log('Using SQLite DB at:', dbPath);

const db = new Database(dbPath);
db.pragma('foreign_keys = ON');
db.pragma('journal_mode = WAL');

export const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS risks (
      risk_id TEXT PRIMARY KEY,
      risk_name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      impact_score INTEGER NOT NULL CHECK(impact_score BETWEEN 1 AND 5),
      probability_score INTEGER NOT NULL CHECK(probability_score BETWEEN 1 AND 5),
      risk_score INTEGER GENERATED ALWAYS AS (impact_score * probability_score) STORED,
      status TEXT DEFAULT 'Open' CHECK(status IN ('Open', 'Mitigated', 'Accepted', 'Transferred', 'Closed')),
      owner TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS controls (
      control_id TEXT PRIMARY KEY,
      control_name TEXT NOT NULL,
      control_type TEXT NOT NULL CHECK(control_type IN ('Preventive', 'Detective', 'Corrective', 'Compensating')),
      description TEXT,
      implementation_status TEXT DEFAULT 'Planned' CHECK(implementation_status IN ('Planned', 'In Progress', 'Implemented', 'Not Implemented')),
      effectiveness_rating INTEGER CHECK(effectiveness_rating BETWEEN 1 AND 5),
      nist_csf TEXT,
      iso27001_ref TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS risk_control_mapping (
      mapping_id INTEGER PRIMARY KEY AUTOINCREMENT,
      risk_id TEXT NOT NULL,
      control_id TEXT NOT NULL,
      mapping_type TEXT DEFAULT 'Primary' CHECK(mapping_type IN ('Primary', 'Secondary', 'Compensating')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (risk_id) REFERENCES risks(risk_id) ON DELETE CASCADE,
      FOREIGN KEY (control_id) REFERENCES controls(control_id) ON DELETE CASCADE,
      UNIQUE(risk_id, control_id)
    );

    CREATE TABLE IF NOT EXISTS framework_references (
      ref_id INTEGER PRIMARY KEY AUTOINCREMENT,
      risk_id TEXT NOT NULL,
      framework_name TEXT NOT NULL CHECK(framework_name IN ('NIST_CSF', 'ISO27001')),
      reference_code TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (risk_id) REFERENCES risks(risk_id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_risks_category ON risks(category);
    CREATE INDEX IF NOT EXISTS idx_risks_risk_score ON risks(risk_score DESC);
    CREATE INDEX IF NOT EXISTS idx_risks_status ON risks(status);
    CREATE INDEX IF NOT EXISTS idx_controls_nist ON controls(nist_csf);
    CREATE INDEX IF NOT EXISTS idx_controls_iso ON controls(iso27001_ref);
  `);

  console.log('✅ Database initialized successfully');
};

export default db;
