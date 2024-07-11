
// Function to create the database
async function createDatabase() {
    try {
      const connection = await mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password
      });
  
      // Create database if it doesn't exist
      await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`);
      console.log(`Database ${config.database} created or already exists.`);
      await connection.end();
    } catch (err) {
      console.error('Error creating database:', err);
    }
  }
  
  createDatabase();