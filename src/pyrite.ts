import "./jsx"
import * as m from "mithril";
import { Router } from "./router";

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
		const router = new Router(this.params);

		setTimeout(() => {
			router.run();
		});
	}
}
