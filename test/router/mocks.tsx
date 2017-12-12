import { Component, Template, m } from "../../src";

import * as sinon from "sinon";

@Template(function(this: TestComponent) {
	return (
		<div>{this.children}</div>
	);
})
export class TestComponent extends Component<any> {
	constructor(args: m.Vnode<any, any>) {
		super(args);

		this.$onInit = sinon.spy();
		this.$onRemove = sinon.spy();
	}
}

@Template(function(this: DisabledComponent) {
	return (
		<div>This should not be shown</div>
	);
})
export class DisabledComponent extends Component<any> {}

export class MainComponent extends TestComponent {}
export class ChildComponent extends TestComponent {}
export class OtherChildComponent extends TestComponent {}
export class BrotherComponent extends TestComponent {}
export class AbstractComponent extends TestComponent {}
export class DefaultComponent extends TestComponent {}

export const routerConfig = [{
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
	},{
		path: "/disabled",
		component: DisabledComponent
	}, {
		path: "/abstract",
		component: AbstractComponent,
		abstract: true,
		default: "/default",
		routes: [{
			path: "/default",
			component: DefaultComponent
		}]	
	}]
}];
