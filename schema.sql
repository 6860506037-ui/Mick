-- SQL Script to initialize MariaDB Database for DataStruct Explorer

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS datastruct_db;
USE datastruct_db;

-- 2. Table for Data Structures
CREATE TABLE IF NOT EXISTS data_structures (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('linear', 'non-linear') NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table for Quiz Results
CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    structure_id VARCHAR(50),
    score INT NOT NULL,
    user_email VARCHAR(255),
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (structure_id) REFERENCES data_structures(id)
);

-- 4. Initial Data Seed
INSERT IGNORE INTO data_structures (id, name, type, description) VALUES
('array', 'Array', 'linear', 'A collection of elements identified by index or key.'),
('stack', 'Stack', 'linear', 'A collection of elements following LIFO principle.'),
('queue', 'Queue', 'linear', 'A collection of elements following FIFO principle.'),
('linked-list', 'Linked List', 'linear', 'A linear collection of data elements called nodes.'),
('tree', 'Tree', 'non-linear', 'A hierarchical structure with a root value and subtrees.'),
('graph', 'Graph', 'non-linear', 'A set of vertices and edges connecting pairs of vertices.');
