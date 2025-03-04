const app = require('./app');
const db = require('./config/db');

// Server port
const PORT = process.env.PORT || 5000;

// Test MySQL connection
db.execute('SELECT 1')
    .then(() => {
        console.log('MySQL connected successfully!');
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MySQL connection failed:', err);
    });

    