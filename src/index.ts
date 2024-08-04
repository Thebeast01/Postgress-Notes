import { Client } from 'pg';
const client = new Client({
  connectionString: 'postgresql://neondb_owner:tA3g6PZpjJNK@ep-billowing-voice-a5w83h81.us-east-2.aws.neon.tech/neondb?sslmode=require',
});
// Function to create users Table to the database
async function createUsersTable() {
  await client.connect();
  const result = await client.query(`
                CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
                );
                `);

  console.log(result);
}
// Function to insert Data into the users table
async function insertData(username: string, email: string, password: string) {
  try {
    await client.connect();

    const insertQuery = `
                INSERT INTO users (username, email, password)
                VALUES($1, $2, $3);

                `;
    const value = [username, email, password];
    const res = await client.query(insertQuery, value);
    console.log('Insertion Successfull', res);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}

// Update Function
async function UpdateDatabase(username: string, email: string): Promise<void> {
  try {
    await client.connect();
    const updateQuery = `
                        UPDATE users
                        SET username = $1
                        WHERE email = $2;

                `;
    const value = [username, email];
    const result = await client.query(updateQuery, value);
    console.log('Updated Successfully....', result);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
  }
}
// insertData('harkirat', 'kirat@gmail.com', '93043').catch(console.error);
// UpdateDatabase('thebeast01', 'mohammadsaif0847@gmail.com').catch(console.error);

async function getUsers(email: string) {
  try {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1';
    const value = [email];
    const result = await client.query(query, value);
    console.log('Fetching Data.. ', result);


  } catch (error) {

    console.log(error)
  }
}
const email = 'mohammadsaif0847@gmail.com'
getUsers(email);

// Relation between two table using foreign key constraint
// Foriegn key constraint is used to link two tables together
// Lets assume that you have a users table and a todo table so to link the todo of the users to their respective user we can use the foreign key constraint

// What is JOIN in sql

