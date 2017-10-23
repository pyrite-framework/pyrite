import * as m from "mithril";
import { Injections } from "./pyrite";

export function Render(selector: string, attributes: object, ...children: Array<any>): any{
	return m(selector, attributes, children);
}

export function Component (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		function newTarget(this: any) {
			const injects = target.prototype.__inject;
			if (injects) {
				injects.forEach((inject: any) => {
					target.prototype[inject.method] = getDescendantProp(Injections, inject.name);
				});

				delete target.prototype.__inject;
			}

			const refs = target.prototype.__refs;
			if (refs) {
				target.prototype[refs] = {};

				setTimeout(() => {
					const elements = this.dom.querySelectorAll("[ref]");

					elements.forEach((element: any) => {
						const refName = element.getAttribute("ref");
						target.prototype[refs][refName] = element;
					});
				});

				delete target.prototype.__refs;
			}

			const attrs = target.prototype.__attributes;
			if (attrs) {
				target.prototype[attrs] = {};

				Object.keys(this.attrs).forEach((attr: string) => {
					target.prototype[attrs][attr] = this.attrs[attr];
				});

				delete target.prototype.__attributes;
			}

			return new target(this);
		}

		target.prototype.view = function(args: any) {
			return template.call(this, this, args);
		};

		return newTarget;
	}
}

export function Inject (name: string): any {
	return function (target: any, method: any, descriptor: any): any {
		if (!target.__inject) target.__inject = [];

		target.__inject.push({
			name, method
		});
	}
}

export function Refs (target: any, method: any, descriptor: any): any {
	target.__refs = method;
}

export function Attributes (target: any, method: any, descriptor: any): any {
	target.__attributes = method;
}

function getDescendantProp(obj: any, desc?: string): any {
	if (!desc) return obj;

	const arr = desc.split(".");

	while (arr.length && (obj = obj[arr.shift() || '']));

	return obj;
}
