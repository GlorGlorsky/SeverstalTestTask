import pg from "pg";

const db = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "severstal",
});

export default db;



// create TABLE [IF NOT EXISTS] notes(
//       id SERIAL PRIMARY KEY,    
//       title VARCHAR(255),    
//       done BOOLEAN,
//       date DATE);