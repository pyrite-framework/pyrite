import { Component, Children, Render } from "../../src";
import { Router, RouteParams } from "../../src/router";

import * as sinon from "sinon";


@Component(function(this: MainComponent) {
	return (
		<div>
			<div>Main</div>
			<div>{this.children}</div>
		</div>
	);
})
export class MainComponent {
	@Children children: any;

	name = "MainComponent";

	$onInit = sinon.spy();
	$onRemove = sinon.spy();
}

@Component(function(this: ChildComponent) {
	return (
		<div>
			<div>Child</div>
			<div>{this.children}</div>
		</div>
	);
})
export class ChildComponent {
	@Children children: any;	
	
	name = "ChildComponent";

	$onInit = sinon.spy();
	$onRemove = sinon.spy();
}

@Component(function(this: OtherChildComponent) {
	return (
		<div>
			<div>Other</div>
		</div>
	);
})
export class OtherChildComponent {
	name = "OtherChildComponent";

	$onInit = sinon.spy();
	$onRemove = sinon.spy();
}

@Component(function(this: BrotherComponent) {
	return (
		<div>
			<div>Brother</div>
			<div>{this.children}</div>
		</div>
	);
})
export class BrotherComponent {
	@Children children: any;	
	
	name = "BrotherComponent";

	$onInit = sinon.spy();
	$onRemove = sinon.spy();
}

export function createRouter(options: any = {}) {
	return new Router({
		prefix: options.prefix,
		onRouteChange: options.onRouteChange,
		routes: [{
			path: "/",
			component: MainComponent,
			routes: [{
				path: "/child",
				component: ChildComponent,
				routes: [{
					path: "/:id",
					component: OtherChildComponent
				}]
			}, {
				path: "/brother",
				component: BrotherComponent
			}]
		}]
	});
}

export function createRouterForRouteChange(cb: Function) {
	const options: any = {};

	options.onRouteChange = cb;

	return createRouter(options);
}