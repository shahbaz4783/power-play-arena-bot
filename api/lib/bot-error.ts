import { BotError, Context, GrammyError, HttpError } from 'grammy';

export const handleBotError = async (error: unknown, ctx: Context) => {
	console.log(error);
	if (error instanceof BotError) {
		await ctx.reply('Bot Error: ' + error.message);
		console.log('Bot Error: ' + error.message);
	} else if (error instanceof HttpError) {
		await ctx.reply('HTTP Error: ' + error.message);
		console.log('HTTP Error: ' + error.message);
	} else if (error instanceof GrammyError) {
		ctx.reply('Grammy Error: ' + error.message);
		console.log('Grammy Error: ' + error.message);
	} else {
		ctx.reply(
			'Oops! Something went wrong while processing your request. Please try again later.'
		);
	}
};
