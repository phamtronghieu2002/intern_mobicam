import mysql from "mysql2/promise";
import db_connetion from "../configs/db";
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool(db_connetion);

export default pool;
