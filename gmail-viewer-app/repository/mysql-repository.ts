import { IRepository } from "./repository.interface";
import mysql, { Pool, PoolOptions } from "mysql2/promise";
import { EmailMessage } from "@/types/gmail";
import dotenv from "dotenv";

export class MySQLRepository<T> implements IRepository<T> {
  private pool!: Pool;

  constructor(
    private tableName: string,
    private config: PoolOptions
  ) {
    this.pool = mysql.createPool(this.config);
  }

  private async getConnection(){
    return this.pool;
  }

  async findAll(options?: { limit?: number; offset?: number }): Promise<T[]> {
    const conn = await this.getConnection();
    let query = `SELECT * FROM \`${this.tableName}\` ORDER BY created_at DESC`;
    const params: any[] = [];

    if (options?.limit !== undefined) {
      query += " LIMIT ?";
      params.push(options.limit);
      if (options.offset !== undefined) {
        query += " OFFSET ?";
        params.push(options.offset);
      }
    }

    const [rows] = await conn.query(query, params);
    return rows as T[];
  }

  async findById(id: string | number): Promise<T | null> {
    const conn = await this.getConnection();
    const [rows] = await conn.query(
      `SELECT * FROM \`${this.tableName}\` WHERE id = ? LIMIT 1`, [id]
    );
    const result = (rows as T[])[0];
    return result || null;
  }

  async create(item: T): Promise<T> {
    const conn = await this.getConnection();
    const [result] = await conn.query(
      `INSERT INTO \`${this.tableName}\` SET ?`, [item]
    );
    return { ...item, id: (result as any).insertId };
  }

  async update(id: string | number, item: Partial<T>): Promise<boolean> {
    const conn = await this.getConnection();
    const [result] = await conn.query(
      `UPDATE \`${this.tableName}\` SET ? WHERE id = ?`, [item, id]
    );
    return (result as any).affectedRows > 0;
  }

  async delete(id: string | number): Promise<boolean> {
    const conn = await this.getConnection();
    const [result] = await conn.query(
      `DELETE FROM \`${this.tableName}\` WHERE id = ?`, [id]
    );
    return (result as any).affectedRows > 0;
  }
}

// Define your MySQL config here
const mysqlConfig: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Export a ready-to-use Email repository instance
export const emailRepo = new MySQLRepository<EmailMessage>("emails", mysqlConfig);