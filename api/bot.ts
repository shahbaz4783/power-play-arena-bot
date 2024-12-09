import 'dotenv/config';
import express from 'express';
import { Bot, webhookCallback } from 'grammy';
import { homeRoute } from './controllers/routes.js';
import { startListener } from './controllers/start-listener.js';
import { helpListener } from './controllers/help-listener.js';
import {
	dailyBountyListener,
	fortuneFlipListener,
	leaderboardListener,
	milestonesListener,
	powerStrikeListener,
	referListener,
} from './controllers/guide-listener.js';

const bot = new Bot(process.env.BOT_TOKEN!);

async function setCommandsWithRetry(maxRetries = 5) {
	let retries = 0;
	while (retries < maxRetries) {
		try {
			await bot.api.setMyCommands([
				{ command: 'start', description: 'Enter the arena' },
				{ command: 'help', description: 'Help' },
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
bot.command('help', helpListener);

bot.on('callback_query', async (ctx) => {
	const callbackData = ctx.callbackQuery.data;
	if (callbackData === 'help_command') {
		await helpListener(ctx);
	}
	if (callbackData === 'refer') {
		referListener(ctx);
	}
	if (callbackData === 'daily_bounty') {
		dailyBountyListener(ctx);
	}
	if (callbackData === 'power_strike') {
		powerStrikeListener(ctx);
	}
	if (callbackData === 'fortune_flip') {
		fortuneFlipListener(ctx);
	}
	if (callbackData === 'leaderboard') {
		leaderboardListener(ctx);
	}
	if (callbackData === 'milestones') {
		milestonesListener(ctx);
	}
	if (callbackData === '/close') {
		await ctx.deleteMessage();
	}
});

bot.on('pre_checkout_query', async (ctx) => {
	try {
		const { id, from, currency, total_amount, invoice_payload } =
			ctx.preCheckoutQuery;

		console.log('Pre-Checkout Query:', {
			id,
			from,
			currency,
			total_amount,
			payload: invoice_payload,
		});

		await ctx.answerPreCheckoutQuery(true);
	} catch (error) {
		console.error('Failed to answer Pre-Checkout Query:', error);
		await ctx.answerPreCheckoutQuery(false, {
			error_message:
				'There was an issue processing your payment. Please try again.',
		});
	}
});

const app = express();
app.use(express.json());

app.get('/api/bot', homeRoute);

app.use(webhookCallback(bot, 'express'));

// Start the Server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
