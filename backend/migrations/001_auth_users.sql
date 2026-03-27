-- Add users table for authentication (JWT + bcrypt)
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('Admin','Member') NOT NULL DEFAULT 'Member',
  member_id INT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_users_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE SET NULL
);

-- Optional: add book cover URL for UI cards
ALTER TABLE books
  ADD COLUMN cover_url VARCHAR(500) NULL;

