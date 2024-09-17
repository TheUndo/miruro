import type { Config } from "../src/types";

export default {
	domain: "demo.gogoanime.dev",
	name: "Gogoanime",
	title: "Gogoanime | Watch Anime Online, Free Anime Streaming",
	description: "Watch anime online for free",
	theme: "gogoanime",
	anilist: {
		clientId: "21088",
		clientSecret: "ReIwngfcsoswz15JISdXalNMW45BLgTXS6WZ5okM",
		redirectUri: "https://demo.gogoanime.dev:5173/callback",
	},
} satisfies Config;
