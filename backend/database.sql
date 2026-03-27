CREATE DATABASE IF NOT EXISTS library_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE library_management;

CREATE TABLE IF NOT EXISTS books (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(120) NOT NULL,
  status ENUM('available', 'inactive') NOT NULL DEFAULT 'available',
  quantity INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_author ON books(author);
CREATE INDEX idx_books_category ON books(category);

CREATE TABLE IF NOT EXISTS members (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(50) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_members_created_at ON members(created_at);

CREATE TABLE IF NOT EXISTS borrow_history (
  id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  book_id BIGINT UNSIGNED NOT NULL,
  member_id BIGINT UNSIGNED NOT NULL,
  borrowed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  returned_at DATETIME NULL,
  status ENUM('borrowed', 'returned') NOT NULL DEFAULT 'borrowed',
  notes VARCHAR(500) NULL,
  CONSTRAINT fk_borrow_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE RESTRICT,
  CONSTRAINT fk_borrow_member FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE RESTRICT
);

CREATE INDEX idx_borrow_history_status ON borrow_history(status);
CREATE INDEX idx_borrow_history_borrowed_at ON borrow_history(borrowed_at);
