export abstract class Component<Attributes> {
	props: Attributes;
	children: Array<HTMLElement>;

	$onInit(args?: any): any {}
	$onCreate(args?: any): any {}
	$onBeforeUpdate(args?: any, oldArgs?: any): any {}
	$onUpdate(args?: any): any {}
	$onBeforeRemove(args?: any): any {}
	$onRemove(args?: any): any {}

	constructor(args: any) {
		this.props = args.attrs;

		const template: Function = Reflect.getMetadata("template", this);

		if (template) this.view = (args: any) => {
			this.children = args.children;

			return template.call(this, args);
		};
	}

	oninit(args: any) {
		return this.$onInit(args);
	}

	oncreate(args: any) {
		return this.$onCreate(args);
	}

	onbeforeupdate(args:any, oldArgs: any) {
		return this.$onBeforeUpdate(args, oldArgs);
	}

	onupdate(args: any) {
		return this.$onUpdate(args);
	}

	onbeforeremove(args: any) {
		return this.$onBeforeRemove(args);
	}

	onremove(args: any) {
		return this.$onRemove(args);
	}

	view(args: any) {}
}
