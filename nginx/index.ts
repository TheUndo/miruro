import * as config from "@undo/config";

const template = await Bun.file(new URL("nginx.conf", import.meta.url)).text();

const sites = Object.values(config);

const configs: string[] = [];

console.log(`Generating ${sites.length} nginx configs`);

for (const site of sites) {
	console.log(`Generating ${site.domain}.conf`);
	const content = template
		.replaceAll("!DOMAIN!", site.domain)
		.replaceAll("!THEME!", site.theme);

	configs.push(content);
}

await Bun.write("dist/nginx.conf", configs.join("\n"));
