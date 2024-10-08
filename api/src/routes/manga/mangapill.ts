import { MANGA } from "@consumet/extensions";
import type {
	FastifyInstance,
	FastifyReply,
	FastifyRequest,
	RegisterOptions,
} from "fastify";
const routes = async (fastify: FastifyInstance, options: RegisterOptions) => {
	const mangapill = new MANGA.MangaPill();

	fastify.get("/", (_, rp) => {
		rp.status(200).send({
			intro: `Welcome to the Mangapill provider: check out the provider's website @ ${mangapill.toString.baseUrl}`,
			routes: ["/:query", "/info", "/read"],
			documentation: "https://docs.consumet.org/#tag/mangapill",
		});
	});

	fastify.get(
		"/:query",
		async (request: FastifyRequest, reply: FastifyReply) => {
			const query = (request.params as { query: string }).query;

			const res = await mangapill.search(query);

			reply.status(200).send(res);
		},
	);

	fastify.get("/info", async (request: FastifyRequest, reply: FastifyReply) => {
		const id = (request.query as { id: string }).id;

		if (typeof id === "undefined")
			return reply.status(400).send({ message: "id is required" });

		try {
			const res = await mangapill.fetchMangaInfo(id);

			reply.status(200).send(res);
		} catch (err) {
			reply
				.status(500)
				.send({ message: "Something went wrong. Please try again later." });
		}
	});

	fastify.get("/read", async (request: FastifyRequest, reply: FastifyReply) => {
		const chapterId = (request.query as { chapterId: string }).chapterId;

		if (typeof chapterId === "undefined")
			return reply.status(400).send({ message: "chapterId is required" });

		try {
			const res = await mangapill
				.fetchChapterPages(chapterId)
				.catch((err: Error) =>
					reply.status(404).send({ message: err.message }),
				);

			reply.status(200).send(res);
		} catch (err) {
			reply
				.status(500)
				.send({ message: "Something went wrong. Please try again later." });
		}
	});
};

export default routes;
