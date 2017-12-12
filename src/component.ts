import * as m from "mithril";
import { templateSymbol } from "./decorators";

export type Children = m.Children | JSX.Element | null | void;

export interface DefaultAttributes<Attributes> {
	ref?: (component: Component<Attributes>) => void;
	key?: string | number;
}

export abstract class Component<Attributes> {
	props: Attributes & DefaultAttributes<Attributes>;
	children: m.Children;
	preventDraw?: boolean;

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

			if (this.preventDraw) {
				this.preventDraw = false;
				return null;
			}

			return template.call(this, vNode);
		};

		if (this.props.ref) this.props.ref(this);
	}

	private oninit(vNode: m.Vnode): any {
		return this.$onInit(vNode);
	}

	private oncreate(vNode: m.Vnode): any {
		return this.$onCreate(vNode);
	}

	private onbeforeupdate(vNode:m.Vnode, oldvNode: m.Vnode): any {
		return this.$onBeforeUpdate(vNode, oldvNode);
	}

	private onupdate(vNode: m.Vnode): any {
		return this.$onUpdate(vNode);
	}

	private onbeforeremove(vNode: m.Vnode): any {
		return this.$onBeforeRemove(vNode);
	}

	private onremove(vNode: m.Vnode): any {
		return this.$onRemove(vNode);
	}

	private view(vNode: m.Vnode): Children {
		return null;
	}
}
