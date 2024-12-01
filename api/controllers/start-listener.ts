import { Context, InlineKeyboard } from 'grammy';
import { handleBotError } from '../lib/bot-error.js';
import { replyStartCaption } from '../lib/bot-replies.js';

const image =
	'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1732206295/game-poster_vzkvuc.jpg';
const webAppURL = 'https://t.me/powerplay_arena_bot/start';
const communityChatURL = 'https://t.me/powerplay_arena';

export const startListener = async (ctx: Context) => {
	try {
		const startKeyboard = new InlineKeyboard()
			.url('Enter the Arena', webAppURL)
			.row()
			.url('Join Community', communityChatURL)
			.text('Help 📖', 'help_command');

		await ctx.replyWithPhoto(image, {
			caption: replyStartCaption(ctx.from?.first_name || 'there'),
			parse_mode: 'HTML',
			reply_markup: startKeyboard,
		});
	} catch (error) {
		handleBotError(error, ctx);
	}
};
