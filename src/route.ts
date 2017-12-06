import * as m from "mithril";
import { Component } from "./component";
import { templateSymbol } from "./decorators";

export abstract class RouteComponent<Attributes> extends Component<Attributes> {
	$onInitRoute(vNode?: m.Vnode): any {}
	$onCreateRoute(vNode?: m.Vnode): any {}
	$onBeforeUpdateRoute(vNode?: m.Vnode, oldvNode?: m.Vnode): any {}
	$onUpdateRoute(vNode?: m.Vnode): any {}
	$onBeforeRemoveRoute(vNode?: m.Vnode): any {}
	$onRemoveRoute(vNode?: m.Vnode): any {}
}
