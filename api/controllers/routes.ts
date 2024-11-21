import { Request, Response } from 'express';

export const homeRoute = (req: Request, res: Response) => {
	res.status(200).json({
		name: 'Power Play Arena Bot',
		description: 'Your ultimate destination',
		features: [
			'Compete in thrilling games',
			'Earn rewards',
			'Stay updated with the latest news',
			'Enjoy a seamless and user-friendly experience',
		],
		commands: [
			'/start - Start interacting with the bot',
			'/help - Get help on how to use the bot',
		],
	});
};
