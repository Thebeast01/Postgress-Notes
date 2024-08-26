# Detailed Explanation of Topics

## 1. PostgreSQL Client Setup

### pg Library

-   The `pg` library is a popular PostgreSQL client for Node.js. It allows you to interact with PostgreSQL databases using JavaScript.
-   It provides various methods to connect to the database, execute queries, and handle results.

### Client Initialization

-   A `Client` instance is created using the `pg` library.
-   The `Client` is initialized with a connection string that includes the database URL, username, password, and other connection parameters.
-   Example:
    ```typescript
    import { Client } from 'pg';
    const client = new Client({
      connectionString: 'postgresql://username:password@host:port/database?sslmode=require',
    });.
    ```

2. Database Table Creation
   Creating Tables
   The project demonstrates how to create a table in PostgreSQL using SQL commands.
   A users table is created with the following columns:
   id: A unique identifier for each user, set as the primary key.
   username: A unique and non-nullable field for the user's name.
   email: A unique and non-nullable field for the user's email.
   password: A non-nullable field for the user's password.
   created_at: A timestamp field that defaults to the current time.

```typescript
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
```

3. Data Insertion

### Inserting Data

1. The projects shows how to insert new records into the users' thable
2. Parameterized queries are used to prevent SQL injection attacks.

```typescript
async function insertData(username: string, email: string, password: string) {
	try {
		await client.connect();
		const insertQuery = `
      INSERT INTO users (username, email, password)
      VALUES($1, $2, $3);
    `;
		const values = [username, email, password];
		const res = await client.query(insertQuery, values);
		console.log('Insertion Successful', res);
	} catch (error) {
		console.log(error);
	} finally {
		await client.end();
	}
}
```

In SQL, a `JOIN` clause is used to combine rows from two or more tables based on a related column between them. There are several types of joins, each serving a different purpose:

### Types of Joins

1. **INNER JOIN**:

    - Returns records that have matching values in both tables.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a
        INNER JOIN table2 b ON a.common_column = b.common_column;
        ```

2. **LEFT JOIN (or LEFT OUTER JOIN)**:

    - Returns all records from the left table, and the matched records from the right table. The result is `NULL` from the right side if there is no match.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a
        LEFT JOIN table2 b ON a.common_column = b.common_column;
        ```

3. **RIGHT JOIN (or RIGHT OUTER JOIN)**:

    - Returns all records from the right table, and the matched records from the left table. The result is `NULL` from the left side if there is no match.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a
        RIGHT JOIN table2 b ON a.common_column = b.common_column;
        ```

4. **FULL JOIN (or FULL OUTER JOIN)**:

    - Returns all records when there is a match in either left or right table. Records not matching in either table will have `NULL` values.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a
        FULL OUTER JOIN table2 b ON a.common_column = b.common_column;
        ```

5. **CROSS JOIN**:

    - Returns the Cartesian product of the two tables, i.e., all possible combinations of rows.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a
        CROSS JOIN table2 b;
        ```

6. **SELF JOIN**:
    - A self join is a regular join but the table is joined with itself.
    - Example:
        ```sql
        SELECT a.column1, b.column2
        FROM table1 a, table1 b
        WHERE a.common_column = b.common_column;
        ```

### Example Scenario

Consider two tables: `employees` and `departments`.

-   `employees` table:
    | employee_id | name | department_id |
    |-------------|----------|---------------|
    | 1 | John | 10 |
    | 2 | Jane | 20 |
    | 3 | Alice | 10 |

-   `departments` table:
    | department_id | department_name |
    |---------------|-----------------|
    | 10 | HR |
    | 20 | Engineering |
    | 30 | Sales |

Using an `INNER JOIN` to get the names of employees and their department names:

```sql
SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments ON employees.department_id = departments.department_id;
```

This would return:
| name | department_name |
|-------|-----------------|
| John | HR |
| Jane | Engineering |
| Alice | HR |

Joins are powerful tools in SQL that allow you to retrieve related data from multiple tables in a single query.

## Snytax of Linking two table with each other 
```` postgresql 

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(50) UNIQUE NOT NULL,
    country VARCHAR(255) UNIQUE NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
    
);

````


