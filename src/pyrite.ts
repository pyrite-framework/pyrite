import * as m from "mithril";
import "./jsx"

const Router = require("mithril-nested-router");
const router = Router.create(m);

export const Injections: any = {}

export const core = m;

export class Pyrite {
	constructor(private params: any) {
		if (params.inject) {
			const names = Object.keys(params.inject);

			const promises = names.map((name) => params.inject[name]);

			Promise.all(promises)
			.then((values: any) => {
				values.forEach((value: any, index: number) => {
					const name = names[index];
					Injections[name] = value;
				});

				this.render();
			});

		} else this.render();
	}

	render() {
		const rootElement = this.params.rootElement || document.body;
		const rootPath = this.params.rootPath || "/";

		setTimeout(() => {
			router.defineRoutes(rootElement, rootPath, this.params.routes);
		});
	}
}
