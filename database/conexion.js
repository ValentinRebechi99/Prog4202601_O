import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config('../.env');

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const conexion = await pool.connect();

export default conexion;