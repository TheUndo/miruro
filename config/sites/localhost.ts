import type { Config } from "../src/types";

export default {
	domain: "localhost",
	name: "Local",
	title: "Gogoanime | Watch Anime Online, Free Anime Streaming",
	description: "Local development environment",
	theme: "gogoanime",
	anilist: {
		clientId: "21088",
		clientSecret: "ReIwngfcsoswz15JISdXalNMW45BLgTXS6WZ5okM",
		redirectUri: "http://localhost:5173/callback",
	},
} satisfies Config;
