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

			const output = new target(this);
			if(this.attrs) {
				Object.keys(this.attrs).forEach((attr: string) => {
					output[attr] = this.attrs[attr];
				});
			}

			return output;
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

function getDescendantProp(obj: any, desc?: string): any {
	if (!desc) return obj;

	const arr = desc.split(".");

	while (arr.length && (obj = obj[arr.shift() || '']));

	return obj;
}
