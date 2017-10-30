import "./jsx"
import * as m from "mithril";
import { Router } from "./router";

export const Injections: any = {}

export const core = m;

export class Pyrite {
	constructor(private params: any) {
		if (params.inject) this.inject();
		else this.render();
	}

	private inject() {
		const names = Object.keys(this.params.inject);

		const injections = names.map((name) => this.params.inject[name]);

		let promises = Promise.resolve();

		injections.forEach((inject, index) => {
			promises = promises.then(() => {
				return inject.then((value: any) => {
					const name = names[index];
					Injections[name] = value;
				});
			});
		});

		promises.then(() => this.render());
	}

	private render() {
		const router = new Router(this.params);

		setTimeout(() => router.run());
	}
}
