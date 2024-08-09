import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import { startListener } from './controllers/listeners.js';
import { homeRoute } from './controllers/routes.js';

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', startListener);

const app = express();
app.use(express.json());

app.get('/', homeRoute);
app.get('/api/bot', homeRoute);

app.use(webhookCallback(bot, 'express'));

// Start the Server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
