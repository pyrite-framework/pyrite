export const templateSimbol = Symbol("template");

export function Template (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		Reflect.defineMetadata(templateSimbol, template, target.prototype);
	}
}
