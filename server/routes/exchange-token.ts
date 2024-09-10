import axios from "axios";
import { z } from "zod";
import { cors } from "..";

const configs: Record<
	string,
	{ clientId: string; clientSecret: string; redirectUri: string }
> = {
	localhost: {
		clientId: "21088",
		clientSecret: "ReIwngfcsoswz15JISdXalNMW45BLgTXS6WZ5okM",
		redirectUri: "http://localhost:5173/callback",
	},
};

const bodySchema = z.object({
	code: z.string(),
});

export async function exchangeAccessToken(req: Request) {
	if (req.method !== "POST") {
		return new Response("Method Not Allowed", { status: 405, headers: cors });
	}

	const hostname = new URL(req.url).hostname;

	const config = configs[hostname];

	if (!config) {
		return new Response("Host is not configured for accounts", {
			status: 404,
			headers: cors,
		});
	}

	const body = bodySchema.safeParse(await req.json());

	if (!body.success) {
		console.log(body.error);
		return new Response("Bad Request", { status: 400, headers: cors });
	}

	const { code } = body.data;

	const payload = {
		client_id: config.clientId,
		client_secret: config.clientSecret,
		code,
		grant_type: "authorization_code",
		redirect_uri: config.redirectUri,
	};

	const url = "https://anilist.co/api/v2/oauth/token";

	try {
		const response = await axios.post(url, payload, {
			headers: {
				"Content-Type": "application/json",
				"Accept-Encoding": "identity",
			},
		});

		if (response.data.access_token) {
			return new Response(
				JSON.stringify({ accessToken: response.data.access_token }),
				{ headers: cors },
			);
		}

		throw new Error("Access token not found in the response");
	} catch (error: unknown) {
		// First, check if it's an instance of Error
		if (error instanceof Error) {
			// Now you can safely read the message property
			const message = error.message;
			// If it's an axios error, it may have a response object
			const details =
				axios.isAxiosError(error) && error.response
					? error.response.data
					: message;
			throw new Error("Failed to exchange token");
		}
		// If it's not an Error object, handle it as a generic error
		throw new Error("Failed to exchange token");
	}
}
