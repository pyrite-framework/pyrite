import "./jsx";
import * as m from "mithril";

export const templateSymbol = Symbol("template");

export function Template (template: (vNode?: m.Vnode<any, any>) => m.Children | JSX.Element | null | void): Function {
	return function (target: Function): void {
		Reflect.defineMetadata(templateSymbol, template, target.prototype);
	}
}
