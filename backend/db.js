import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "nicole",
    password: "root",
    database: "animais"
});