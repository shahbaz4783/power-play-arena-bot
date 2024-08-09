import 'dotenv/config';
import express from 'express';
import { Bot, InlineKeyboard, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN!);

bot.command('start', async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url('Open Mini App', 'https://t.me/bot_nextjs_bot/start')
		.row()
		.text('Explore Guide', 'explore_guide')
		.row()
		.text('Tap to Earn', 'tap_to_earn');

	await ctx.replyWithPhoto('https://grammy.dev/images/grammY.png', {
		caption:
			'Welcome to Powerplay Arena! Tap on the buttons below to get started.',
		reply_markup: keyboard,
	});
});

const app = express();
app.use(express.json());

app.use(webhookCallback(bot, 'express'));

// Start the Server
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
