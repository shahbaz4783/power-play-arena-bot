import { Context, InlineKeyboard } from 'grammy';
import { handleBotError } from '../lib/bot-error.js';
import {
	replyDailyBountyCaption,
	replyFortunFlipCaption,
	replyLeaderboardCaption,
	replyMilestonesCaption,
	replyPowerStrikeCaption,
	replyReferCaption,
} from '../lib/bot-replies.js';

const replyWithCaption = async (
	ctx: Context,
	captionCallback: () => string
) => {
	try {
		const startKeyboard = new InlineKeyboard().row({
			text: '❌ Close',
			callback_data: '/close',
		});

		await ctx.reply(captionCallback(), {
			parse_mode: 'HTML',
			reply_markup: startKeyboard,
		});
	} catch (error) {
		handleBotError(error, ctx);
	}
};

// Listeners
export const referListener = (ctx: Context) =>
	replyWithCaption(ctx, replyReferCaption);

export const dailyBountyListener = (ctx: Context) =>
	replyWithCaption(ctx, replyDailyBountyCaption);

export const fortuneFlipListener = (ctx: Context) =>
	replyWithCaption(ctx, replyFortunFlipCaption);

export const powerStrikeListener = (ctx: Context) =>
	replyWithCaption(ctx, replyPowerStrikeCaption);

export const leaderboardListener = (ctx: Context) =>
	replyWithCaption(ctx, replyLeaderboardCaption);

export const milestonesListener = (ctx: Context) =>
	replyWithCaption(ctx, replyMilestonesCaption);
