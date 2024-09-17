import * as config from "@undo/config";
import fs from "node:fs/promises";
import { JSDOM } from "jsdom";
import { transform } from "lightningcss";

const sites = Object.values(config);

const configs: string[] = [];

await fs.rmdir("dist-themes", { recursive: true });

console.log(`Generating ${sites.length} themes`);

const distLoc = new URL("../dist", import.meta.url);

for (const site of sites) {
	console.log(`Generating ${site.domain} theme`);
	const themeLoc = new URL(`../dist-themes/${site.domain}`, import.meta.url);
	await fs.cp(distLoc, themeLoc, { recursive: true });
	const dom = await JSDOM.fromFile(`${themeLoc.pathname}/index.html`);

	const head = dom.window.document.head;

	const css = await fs.readFile(
		new URL(`../public/themes/${site.theme}/theme.css`, import.meta.url),
	);

	if (!css) {
		throw new Error(`Theme not found for ${site.domain}`);
	}

	const { code: minifiedCss } = transform({
		filename: "theme.css",
		code: css,
		minify: true,
	});

	const style = dom.window.document.createElement("style");
	head.insertAdjacentHTML("beforeend", `<style>${minifiedCss}</style>`);

	head.querySelector<HTMLTitleElement>("title")!.textContent = site.title;
	head.querySelector<HTMLMetaElement>("meta[name='description']")!.content =
		site.description;

	const newHtml = dom.serialize();

	await fs.writeFile(`${themeLoc.pathname}/index.html`, newHtml);
}

await Bun.write("dist/nginx.conf", configs.join("\n"));
