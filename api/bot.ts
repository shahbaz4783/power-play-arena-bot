import 'dotenv/config';
import express from 'express';
import { Bot, InlineKeyboard, webhookCallback } from 'grammy';

const bot = new Bot(process.env.BOT_TOKEN!);

const photoUrl =
	process.env.IMAGE_START ||
	'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1723190218/Untitled_1_wqondb.png';

bot.command('start', async (ctx) => {
	const keyboard = new InlineKeyboard()
		.url('Enter the Arena', process.env.MINI_APP_URL!)
		.row()
		.text('Explore Guide', 'explore_guide')
		.row()
		.text('Tap to Earn', 'tap_to_earn');

	await ctx.replyWithPhoto(photoUrl, {
		caption: `
**Hello ${ctx.from?.first_name}**

Welcome to Power Play Arena, your ultimate destination for engaging and interactive mini-games! Dive into a world of fun and excitement where you can:

- **Compete in thrilling games**: Challenge yourself and others in a variety of mini-games designed to test your skills and reflexes.
- **Earn rewards**: Collect points and earn rewards as you play. The more you play, the more you win!
- **Stay updated**: Get the latest updates and news about new games and features directly within the app.
- **Seamless experience**: Enjoy a smooth and user-friendly interface that makes gaming easy and enjoyable.

Join the Power Play Arena community today and start your adventure!
`,
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
