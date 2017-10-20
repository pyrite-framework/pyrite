import * as m from "mithril";

export function Render(selector: string, attributes: object, ...children: Array<any>): any{
    return m(selector, attributes, children);
}

export function Template (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		target.prototype.view = function(args: any) {
			return template.call(this, args);
		};
	}
}


export class Pyrite {
	constructor(private params: any) {
		this.render();
	}

	render() {
		setTimeout(() => m.mount(document.body, this.params.component));
	}
}
