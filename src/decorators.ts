import * as m from "mithril";
import { Injections } from "./pyrite";

export function Render(selector: string, attributes: object, ...children: Array<any>): any{
	return m(selector, attributes, children);
}

export function Component (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		function newTarget(this: any, args: any) {
			const injects = target.prototype.__inject;
			if (injects) {
				injects.forEach((inject: any) => {
					target.prototype[inject.method] = getDescendantProp(Injections, inject.name);
				});

				delete target.prototype.__inject;
			}

			const output = new target(this);
			const attrs = target.prototype.__attributes;
			if (attrs) {
				output[attrs] = {};

				Object.keys(this.attrs).forEach((attr: string) => {
					output[attrs][attr] = this.attrs[attr];
				});
			}

			const refs = target.prototype.__refs;
			if (refs) output[refs] = {};

			const children = target.prototype.__children;
			if (children) {
				output[children] = this.children;
			}

			return output;
		}

		target.prototype.$onInit = target.prototype.oninit;
		target.prototype.$onBeforeUpdate = target.prototype.onbeforeupdate;
		target.prototype.$onUpdate = target.prototype.onupdate;
		target.prototype.$onBeforeRemove = target.prototype.onbeforeremove;
		target.prototype.$onRemove = target.prototype.onremove;

		target.prototype.oncreate = function(args: any) {
			const refs = target.prototype.__refs;

			if (refs && args.instance.children && args.instance.children.length) {
				setRefs(this[refs], args.instance.children);
			}

			if (this.$onCreate) this.$onCreate(args);
		};

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

export function Refs(target: any, method: string, descriptor?: any): any {
	target.__refs = method;
}

export function Children(target: any, method: string, descriptor?: any): any {
	target.__children = method;
}

export function Attributes(target: any, method: string, descriptor?: any): any {
	target.__attributes = method;
}

function getDescendantProp(obj: any, desc?: string): any {
	if (!desc) return obj;

	const arr = desc.split(".");

	while (arr.length && (obj = obj[arr.shift() || '']));

	return obj;
}

function setRefs(output: any, elements: any) {
	elements.forEach((element: any) => {
		const ref = element.attrs && element.attrs.ref;
		if (ref) {
			if (typeof element.tag === 'string') output[ref] = element.dom;
			else output[ref] = element.state;
		}

		if (element.children && element.children.length) setRefs(output, element.children);
	});
}
