import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import {
	guideListener,
	helpListener,
	socialsListener,
	startListener,
} from './controllers/listeners.js';
import { homeRoute } from './controllers/routes.js';

const bot = new Bot(process.env.BOT_TOKEN!);

async function setCommandsWithRetry(maxRetries = 5) {
	let retries = 0;
	while (retries < maxRetries) {
		try {
			await bot.api.setMyCommands([
				{ command: 'start', description: 'Enter the arena' },
				{ command: 'help', description: 'Show help' },
				{ command: 'guide', description: 'Game guide' },
				{ command: 'socials', description: 'Join community' },
			]);
			console.log('Bot commands set successfully');
			return;
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			} else {
				console.log('An unexpected error occured!');
			}
		}
	}
	console.error('Failed to set bot commands after maximum retries');
}
setCommandsWithRetry();

bot.command('start', startListener);
bot.command('guide', guideListener);
bot.command('help', helpListener);
bot.command('socials', socialsListener);

const app = express();
app.use(express.json());

app.get('/api/bot', homeRoute);

app.use(webhookCallback(bot, 'express'));

// Start the Server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
