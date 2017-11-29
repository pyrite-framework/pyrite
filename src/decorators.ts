export function Template (template: Function): any {
	return function (target: any, method: any, descriptor: any): any {
		Reflect.defineMetadata("template", template, target.prototype);
	}
}
