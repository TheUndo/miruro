import { exchangeAccessToken } from "./routes/exchange-token";

export const cors = new Headers(
	process.env.NODE_ENV === "production"
		? {}
		: {
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Headers": "*",
			},
);

Bun.serve({
	fetch(req) {
		const { pathname } = new URL(req.url);

		if (req.method === "OPTIONS") {
			return new Response("OK", { headers: cors });
		}

		switch (pathname) {
			case "/api/exchange-token":
				return exchangeAccessToken(req);
			default:
				return new Response("Not Found", { status: 404, headers: cors });
		}
	},
	port: 4000,
});

console.log("Running", process.env.NODE_ENV ?? "development");
