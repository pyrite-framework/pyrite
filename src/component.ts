import * as m from "mithril";
import { templateSymbol } from "./decorators";

export type Children = m.Children | JSX.Element | null | void;

export abstract class Component<Attributes> {
	props: Attributes & { ref?: (component: Component<Attributes>) => void };
	children: m.Children;

	$onInit(vNode?: m.Vnode): any {}
	$onCreate(vNode?: m.Vnode): any {}
	$onBeforeUpdate(vNode?: m.Vnode, oldvNode?: m.Vnode): any {}
	$onUpdate(vNode?: m.Vnode): any {}
	$onBeforeRemove(vNode?: m.Vnode): any {}
	$onRemove(vNode?: m.Vnode): any {}

	constructor(vNode: m.Vnode) {
		this.props = vNode.attrs as Attributes;

		const template: (vNode: m.Vnode) => Children = Reflect.getMetadata(templateSymbol, this);

		if (template) this.view = (vNode: m.Vnode): Children => {
			this.children = vNode.children;

			return template.call(this, vNode);
		};

		if (this.props.ref) this.props.ref(this);
	}

	oninit(vNode: m.Vnode): any {
		return this.$onInit(vNode);
	}

	oncreate(vNode: m.Vnode): any {
		return this.$onCreate(vNode);
	}

	onbeforeupdate(vNode:m.Vnode, oldvNode: m.Vnode): any {
		return this.$onBeforeUpdate(vNode, oldvNode);
	}

	onupdate(vNode: m.Vnode): any {
		return this.$onUpdate(vNode);
	}

	onbeforeremove(vNode: m.Vnode): any {
		return this.$onBeforeRemove(vNode);
	}

	onremove(vNode: m.Vnode): any {
		return this.$onRemove(vNode);
	}

	view(vNode: m.Vnode): Children {}
}
