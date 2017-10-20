import * as m from "mithril";

export function Render(selector: string, attributes: object, ...children: Array<any>): any{
    return m(selector, attributes, children);
}

export function Template (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		target.prototype.view = function() {
			return template(this);
		};
	}
}

export class Pyrite {
	constructor(private params: any) {
		this.render();
	}

	render() {
		m.mount(document.body, this.params.component);
	}
}
