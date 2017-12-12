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

	$onInit(vNode?: m.Vnode<Attributes, any>): any {}
	$onCreate(vNode?: m.Vnode<Attributes, any>): any {}
	$onBeforeUpdate(vNode?: m.Vnode<Attributes, any>, oldvNode?: m.Vnode<Attributes, any>): any {}
	$onUpdate(vNode?: m.Vnode<Attributes, any>): any {}
	$onBeforeRemove(vNode?: m.Vnode<Attributes, any>): any {}
	$onRemove(vNode?: m.Vnode<Attributes, any>): any {}

	constructor(vNode: m.Vnode<Attributes, any>) {
		this.props = vNode.attrs as Attributes;

		const template: (vNode: m.Vnode<Attributes, any>) => Children = Reflect.getMetadata(templateSymbol, this);

		if (template) this.view = (vNode: m.Vnode<Attributes, any>): Children => {
			this.children = vNode.children;

			if (this.preventDraw) {
				this.preventDraw = false;
				return null;
			}

			return template.call(this, vNode);
		};

		if (this.props.ref) this.props.ref(this);
	}

	private oninit(vNode: m.Vnode<Attributes, any>): any {
		return this.$onInit(vNode);
	}

	private oncreate(vNode: m.Vnode<Attributes, any>): any {
		return this.$onCreate(vNode);
	}

	private onbeforeupdate(vNode:m.Vnode<Attributes, any>, oldvNode: m.Vnode<Attributes, any>): any {
		return this.$onBeforeUpdate(vNode, oldvNode);
	}

	private onupdate(vNode: m.Vnode<Attributes, any>): any {
		return this.$onUpdate(vNode);
	}

	private onbeforeremove(vNode: m.Vnode<Attributes, any>): any {
		return this.$onBeforeRemove(vNode);
	}

	private onremove(vNode: m.Vnode<Attributes, any>): any {
		return this.$onRemove(vNode);
	}

	private view(vNode: m.Vnode<Attributes, any>): Children {
		return null;
	}
}
