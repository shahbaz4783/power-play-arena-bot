import { Context, InlineKeyboard } from 'grammy';
import { replyStartCaption } from '../markdown/reply-start.js';

const image =
	'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1723190218/Untitled_1_wqondb.png';

// start command listener
export const startListener = async (ctx: Context) => {
	console.table({
		command: '/start',
		name: ctx.from?.first_name,
		username: ctx.from?.username,
	});

	const startKeyboard = new InlineKeyboard()
		.url('Enter the Arena', 'https://t.me/powerplay_arena_bot/start')
		.row()
		.text('Explore Guide', 'explore_guide')
		.row()
		.text('Tap to Earn', 'tap_to_earn');

	await ctx.replyWithPhoto(image, {
		caption: replyStartCaption(ctx.from?.first_name || 'there'),
		parse_mode: 'MarkdownV2',
		reply_markup: startKeyboard,
	});
};
