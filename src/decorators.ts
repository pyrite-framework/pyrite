import * as m from "mithril";
import { PyriteComponent } from "./component";

export function Render(selector: string, attributes: object, ...children: Array<any>): any{
	return m(selector, attributes, children);
}

export function Component (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		return PyriteComponent.get(target, template);
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
