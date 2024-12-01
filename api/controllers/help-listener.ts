import { Context, InlineKeyboard } from 'grammy';
import { replyHelpCaption } from '../lib/bot-replies.js';

export const helpListener = async (ctx: Context) => {
	try {
		const startKeyboard = new InlineKeyboard()
			.row(
				{
					text: 'Refer & Earn',
					callback_data: 'refer',
				},
				{
					text: 'Daily Bounty',
					callback_data: 'daily_bounty',
				}
			)
			.row(
				{
					text: 'Fortune Flip',
					callback_data: 'fortune_flip',
				},
				{
					text: 'Power Strike',
					callback_data: 'power_strike',
				}
			)
			.row(
				{
					text: 'Leaderboard',
					callback_data: 'leaderboard',
				},
				{
					text: 'Milestones',
					callback_data: 'milestones',
				}
			)
			.row({
				text: '❌ Close',
				callback_data: '/close',
			});

		await ctx.reply(replyHelpCaption(), {
			parse_mode: 'HTML',
			reply_markup: startKeyboard,
		});
	} catch (error) {
		console.error('Error fetching user or sending referral info:', error);
		await ctx.reply(
			'🚨 Oops! Something went wrong while processing your request. Please try again later.'
		);
	}
};
