import mysql from "mysql2/promise";
const requiredEnv = (name) => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not defined in .env`);
    }
    return value;
};
const pool = mysql.createPool({
    host: requiredEnv("DB_HOST"),
    user: requiredEnv("DB_USER"),
    password: requiredEnv("DB_PASSWORD"),
    database: requiredEnv("DB_NAME"),
    port: Number(process.env.DB_PORT || 3306),
});
export default pool;
