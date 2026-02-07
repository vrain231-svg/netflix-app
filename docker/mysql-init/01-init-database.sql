USE netflix-mail;

CREATE TABLE IF NOT EXISTS emails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_id VARCHAR(255) UNIQUE NOT NULL,
    subject TEXT,
    sender VARCHAR(255),
    body LONGTEXT,
    body_snippet TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email_id (email_id),
    INDEX idx_created_at (created_at)
);