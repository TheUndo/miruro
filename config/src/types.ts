export type Theme = "gogoanime";

export type Config = {
	domain: string;
	title: string;
	name: string;
	description: string;
	adScript?: string;
	theme: Theme;
	anilist: {
		clientId: string;
		clientSecret: string;
		redirectUri: string;
	};
};
