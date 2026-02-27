import express from "express";
import { createServer as createViteServer } from "vite";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

dotenv.config();

async function initDb() {
  const connectionConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    multipleStatements: true // Important for running schema.sql
  };

  try {
    const connection = await mysql.createConnection(connectionConfig);
    console.log("Connected to MariaDB server for initialization.");

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'datastruct_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    await connection.query(`USE ${dbName}`);

    // Read and execute schema.sql
    const schemaPath = path.join(process.cwd(), "schema.sql");
    if (fs.existsSync(schemaPath)) {
      const schema = fs.readFileSync(schemaPath, "utf8");
      await connection.query(schema);
      console.log("Database schema initialized successfully.");
    } else {
      console.warn("schema.sql not found, skipping table creation.");
    }

    await connection.end();
  } catch (error) {
    console.error("Failed to initialize database:", error);
    // We don't exit here to allow the app to start even if DB is not ready
  }
}

async function startServer() {
  // Initialize DB before starting the server
  await initDb();

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // Database Connection Pool (Lazy initialization)
  let pool: mysql.Pool | null = null;

  const getPool = () => {
    if (!pool) {
      pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '3306'),
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'datastruct_db',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
    }
    return pool;
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Server is running" });
  });

  // Example: Get all data structures from DB
  app.get("/api/structures", async (req, res) => {
    try {
      const db = getPool();
      const [rows] = await db.query("SELECT * FROM data_structures");
      res.json(rows);
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ error: "Database connection failed. Ensure MariaDB is running and configured." });
    }
  });

  // Example: Save quiz result
  app.post("/api/quiz-results", async (req, res) => {
    const { structure_id, score, user_email } = req.body;
    try {
      const db = getPool();
      await db.query(
        "INSERT INTO quiz_results (structure_id, score, user_email) VALUES (?, ?, ?)",
        [structure_id, score, user_email]
      );
      res.json({ success: true });
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ error: "Failed to save result" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
