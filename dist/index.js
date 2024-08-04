"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: 'postgresql://neondb_owner:tA3g6PZpjJNK@ep-billowing-voice-a5w83h81.us-east-2.aws.neon.tech/neondb?sslmode=require',
});
// Function to create users Table to the database
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const result = yield client.query(`
                CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
                `);
        console.log(result);
    });
}
// Function to insert Data into the users table
function insertData(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertQuery = `
                INSERT INTO users (username, email, password)
                VALUES($1, $2, $3);

                `;
            const value = [username, email, password];
            const res = yield client.query(insertQuery, value);
            console.log('Insertion Successfull', res);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
// Update Function
function UpdateDatabase(username, email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const updateQuery = `
                        UPDATE users
                        SET username = $1
                        WHERE email = $2;

                `;
            const value = [username, email];
            const result = yield client.query(updateQuery, value);
            console.log('Updated Successfully....', result);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            yield client.end();
        }
    });
}
// insertData('harkirat', 'kirat@gmail.com', '93043').catch(console.error);
// UpdateDatabase('thebeast01', 'mohammadsaif0847@gmail.com').catch(console.error);
function getUsers(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const query = 'SELECT * FROM users WHERE email = $1';
            const value = [email];
            const result = yield client.query(query, value);
            console.log('Fetching Data.. ', result);
        }
        catch (error) {
            console.log(error);
        }
    });
}
const email = 'mohammadsaif0847@gmail.com';
getUsers(email);
