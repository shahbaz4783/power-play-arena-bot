import { Context, InlineKeyboard } from 'grammy';
import axios from 'axios';
import { replyStartCaption } from '../lib/bot-replies.js';
import { handleBotError } from '../lib/bot-error.js';

const image =
	'https://res.cloudinary.com/dw2o2w9zg/image/upload/v1732206295/game-poster_vzkvuc.jpg';
const webAppURL = 'https://t.me/powerplay_arena_bot/start';
const communityChatURL = 'https://t.me/powerplay_arena';
const API_URL = process.env.NEXT_APP_API_URL;

export const startListener = async (ctx: Context) => {
	const user = ctx.from;

	if (!API_URL) {
		return ctx.reply(
			'API URL is missing. Please check environment variables and update them.'
		);
	}

	if (!user) {
		await ctx.reply("Sorry, I couldn't get your user information.");
		return;
	}

	const telegramId = user.id.toString();
	const inviteCode =
		typeof ctx.match === 'string' ? ctx.match : ctx.match?.[0] || '';

	try {
		const startKeyboard = new InlineKeyboard()
			.url('Enter the Arena', webAppURL)
			.row()
			.url('Join Community', communityChatURL)
			.text('Help 📖', 'help_command');

		const existingUser = await axios.get(
			`${API_URL}/api/user/info?telegramId=${telegramId}`
		);

		if (existingUser.data) {
			await ctx.replyWithPhoto(image, {
				caption: replyStartCaption(existingUser.data.firstName, false, false),

				parse_mode: 'HTML',
				reply_markup: startKeyboard,
			});
		} else {
			console.log('hello hello');
			let referrer = null;
			if (inviteCode) {
				const referrerResponse = await axios.get(
					`${API_URL}/api/user/info?inviteCode=${inviteCode}`
				);
				if (referrerResponse.status === 200) {
					referrer = referrerResponse.data;
				}
			}

			const createUserResponse = await axios.post(
				`${API_URL}/api/user/create`,
				{
					...user,
					referralCode: referrer ? referrer.inviteCode : undefined,
				}
			);

			if (createUserResponse.status === 200) {
				const newUser = createUserResponse.data;

				if (referrer) {
					await ctx.replyWithPhoto(image, {
						caption: replyStartCaption(
							newUser.firstName,
							true,
							true,
							referrer.firstName
						),
						parse_mode: 'HTML',
						reply_markup: startKeyboard,
					});
					await ctx.api.sendMessage(
						referrer.telegramId,
						`🎉 Hey, ${referrer.firstName}, Your friend ${user.first_name} joined the party. You've earned a referral bonus!`
					);
				} else {
					await ctx.replyWithPhoto(image, {
						caption: replyStartCaption(newUser.firstName, true, false),
						parse_mode: 'HTML',
						reply_markup: startKeyboard,
					});
				}
			} else {
				await ctx.reply(
					'Sorry, there was an error creating your user account.'
				);
			}
		}
	} catch (error) {
		handleBotError(error, ctx);
	}
};
