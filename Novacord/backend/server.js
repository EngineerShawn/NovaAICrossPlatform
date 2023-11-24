const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');
const winston = require('winston');
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
require('dotenv').config({path: '../.env'});

// Logging Setup
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'combined.log' }) // Logs to a file
    ],
});

// Database setup with SSL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Set to true if your SSL certificate is verified
    }
});

// Express setup
const app = express();
const port = process.env.PORT || 3000;

// Function to create Discord OAuth URL
function createDiscordAuthUrl(clientId, redirectUri, state, scope = ['identify', 'email', 'connections', 'guilds', 'guilds.join', 'guilds.members.read', 'bot', 'webhook.incoming', 'messages.read', 'applications.builds.read', 'applications.commands', 'applications.store.update', 'applications.entitlements'], prompt = "consent") {
    const baseUrl = "https://discord.com/oauth2/authorize";
    const params = {
        response_type: "code",
        client_id: clientId,
        scope: scope.join(' '),
        redirect_uri: redirectUri,
        state: state,
        prompt: prompt
    };
    const urlParams = querystring.stringify(params);
    return `${baseUrl}?${urlParams}`;
}


// Redirect to Discord for OAuth
app.get('/oauth2/authorize', (req, res) => {
    const discordAuthUrl = createDiscordAuthUrl(
        process.env.CLIENT_ID, 
        process.env.REDIRECT_URI, 
        process.env.STATE // Replace with your actual state string
    );
    res.redirect(discordAuthUrl);
});

// Refresh Token Function
async function refreshToken(refreshToken) {
    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        return tokenResponse.data;
    } catch (error) {
        logger.error('Failed to refresh token:', error);
        throw new Error('Failed to refresh token: ' + error.message);
    }
}

// Revoke Access Token Function
async function revokeAccessToken(accessToken) {
    try {
        await axios.post('https://discord.com/api/oauth2/token/revoke', new URLSearchParams({
            token: accessToken,
            token_type_hint: 'access_token'
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            auth: {
                username: process.env.CLIENT_ID,
                password: process.env.CLIENT_SECRET
            }
        });
    } catch (error) {
        logger.error('Failed to revoke access token:', error);
        throw new Error('Failed to revoke access token: ' + error.message);
    }
}

// Get Token Function
async function getToken() {
    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            grant_type: 'client_credentials',
            scope: 'identify connections'
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            auth: {
                username: process.env.CLIENT_ID,
                password: process.env.CLIENT_SECRET
            }
        });

        return tokenResponse.data;
    } catch (error) {
        logger.error('Failed to get token:', error);
        throw new Error('Failed to get token: ' + error.message);
    }
}

// OAuth2 Callback Route
app.get('/oauth2/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        logger.error('Auth code not found');
        return res.status(400).send('Auth Code not found');
    }

    try {
        const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: process.env.REDIRECT_URI
        }), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        const tokenData = tokenResponse.data;
        const expiresIn = new Date(new Date().getTime() + tokenData.expires_in * 1000);

        // Store token in PostgreSQL database
        const insertQuery = 'INSERT INTO tokens (discord_id, access_token, refresh_token, expires_in) VALUES ($1, $2, $3, $4)';
        const values = [tokenData.discord_id, tokenData.access_token, tokenData.refresh_token, expiresIn];

        await pool.query(insertQuery, values);

        res.send('Token received and stored securely');
        logger.info('Token received and stored securely');
    } catch (error) {
        logger.error('Error exchanging code for token:', error);
        res.status(500).send('Error processing your request');
    }
});

app.listen(port, () => logger.info(`Server is running on port ${port}`));

client.once('ready', () => {
    console.log('NovaAI is Online!');
});
client.login(process.env.NOVA_BOT_TOKEN);

// // Export for testing purposes
module.exports = app;
