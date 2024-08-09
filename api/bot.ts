import 'dotenv/config';
import express from 'express';
import { Bot, InlineKeyboard, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN!);

const image = process.env.IMAGE_START!;

bot.command('start', async (ctx) => {
	console.table({
		command: '/start',
		name: ctx.from?.first_name,
		username: ctx.from?.username,
	});

	const keyboard = new InlineKeyboard()
		.url('Enter the Arena', process.env.MINI_APP_URL!)
		.row()
		.text('Explore Guide', 'explore_guide')
		.row()
		.text('Tap to Earn', 'tap_to_earn');

	await ctx.replyWithPhoto(image, {
		caption: `*Hello ${ctx.from?.first_name}*`,
		parse_mode: 'MarkdownV2',
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
