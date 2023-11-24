const { Pool } = require('pg');
const { bot } = require('../../config');

module.exports = {
    init: () => {
        const pool = new Pool({
            connectionString: bot.postgresUrl,
            // Additional options, if needed (e.g., SSL)
        });

        pool.connect()
            .then(() => console.log('🟩 Connected to PostgreSQL!'))
            .catch(err => console.error('Connection error:', err));

        // You can also set up event listeners if needed
        // For example, to handle errors:
        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });

        // Export the pool to use it elsewhere in your application
        module.exports.pool = pool;
    },
};