import {
	BotError,
	Context,
	GrammyError,
	HttpError,
	InlineKeyboard,
} from 'grammy';
import { replyStartCaption } from '../markdown/reply-start.js';
import { replyHelpCaption } from '../markdown/reply-help.js';
import { replySocialsCaption } from '../markdown/reply-socials.js';

const image =
	'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1732206295/game-poster_vzkvuc.jpg';
const webAppURL = 'https://t.me/powerplay_arena_bot/start';
const communityChatURL = 'https://t.me/powerplay_arena';
const ceoTwitterURL = 'https://x.com/shahbaz4783';
const websiteURL = 'https://powerplay-arena.vercel.app';

// start command listener
export const startListener = async (ctx: Context) => {
	try {
		const startKeyboard = new InlineKeyboard()
			.url('Enter the Arena', webAppURL)
			.row()
			.url('Join Community', communityChatURL)
			.url('Visit Website', websiteURL);

		await ctx.replyWithPhoto(image, {
			caption: replyStartCaption(ctx.from?.first_name || 'there'),
			parse_mode: 'MarkdownV2',
			reply_markup: startKeyboard,
		});
	} catch (error) {
		if (error instanceof BotError) {
			console.log('Bot Error: ' + error.message);
		} else if (error instanceof HttpError) {
			console.log('HTTP Error: ' + error.message);
		} else if (error instanceof GrammyError) {
			console.log('Grammy Error: ' + error.message);
		} else {
			console.log('Someting went wrong');
		}
	}
};

// help command listener
export const helpListener = async (ctx: Context) => {
	try {
		await ctx.reply(replyHelpCaption(), {
			parse_mode: 'MarkdownV2',
		});
	} catch (error) {
		if (error instanceof BotError) {
			console.log('Bot Error: ' + error.message);
		} else if (error instanceof HttpError) {
			console.log('HTTP Error: ' + error.message);
		} else if (error instanceof GrammyError) {
			console.log('Grammy Error: ' + error.message);
		} else {
			console.log('Someting went wrong');
		}
	}
};

// socials command listener
export const socialsListener = async (ctx: Context) => {
	try {
		const socialsKeyboard = new InlineKeyboard()
			.url('Website', websiteURL)
			.row()
			.url('Telegram Chat', communityChatURL)
			.url('Follow on Twitter', ceoTwitterURL)
			.row()
			.url('Follow the developer', ceoTwitterURL);

		await ctx.reply(replySocialsCaption(), {
			parse_mode: 'MarkdownV2',
			reply_markup: socialsKeyboard,
		});
	} catch (error) {
		if (error instanceof BotError) {
			console.log('Bot Error: ' + error.message);
		} else if (error instanceof HttpError) {
			console.log('HTTP Error: ' + error.message);
		} else if (error instanceof GrammyError) {
			console.log('Grammy Error: ' + error.message);
		} else {
			console.log('Someting went wrong');
		}
	}
};
