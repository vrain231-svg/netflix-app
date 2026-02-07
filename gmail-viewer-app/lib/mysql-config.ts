import mysql, { PoolOptions } from "mysql2/promise";

export const getMySQLConfig = (): PoolOptions => {
  return {
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || '',
    
    // Connection pool settings
    connectionLimit: 10,
    
    // Character set and timezone
    charset: 'utf8mb4',
    timezone: '+00:00',
    
    // Enable multiple statements
    multipleStatements: true,
    
    // Additional connection options
    supportBigNumbers: true,
    bigNumberStrings: false,
    
    // Query options
    typeCast: function (field: any, next: any) {
      if (field.type === 'TINY' && field.length === 1) {
        return (field.string() === '1'); // 1 = true, 0 = false
      }
      return next();
    }
  };
};

export const createMySQLPool = () => {
  const config = getMySQLConfig();
  return mysql.createPool(config);
};
