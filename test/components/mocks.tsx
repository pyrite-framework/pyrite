import { Render, Component, Attributes, Children, Refs, RouteParams, Inject } from "../../src";
import { Injections } from "../../src/pyrite";
import * as m from "mithril";

Injections.example = {
	get() {}
};

@Component(function(this: ChildofChildComponent) {
	return (<div>ChildofChild</div>);
})
export class ChildofChildComponent {}

@Component(function(this: ChildComponent) {
	return (<div>Child</div>);
})
export class ChildComponent {
	loaded = true;
}

@Component(function(this: TestComponent) {
	return (
		<div>
			TextNode
			<div ref="example">Example</div>
			<ChildComponent ref="component">
				<ChildofChildComponent ref="subcomponent"></ChildofChildComponent>
			</ChildComponent>
			<ChildComponent></ChildComponent>
			<div>{this.children}</div>
		</div>
	);
})
export class TestComponent {
	@Children children: any;
	@Attributes attrs: any;
	@Refs refs: any;
	@RouteParams params: any;
	@Inject('example') service: any;
	@Inject('example.get') serviceGet: any;

	loaded: Boolean;

	constructor() {
		this.loaded = true;
	}
}

export function draw(Component: any) {
	const component: any = (
		<Component example="value">
			<div>Children</div>
		</Component>
	);

	m.render(document.body, component);

	return component;
}
