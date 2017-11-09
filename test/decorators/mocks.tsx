import { Render, Component, Attributes, Children, Refs, RouteParams, Inject } from "../../src";

export class TestComponent {
	@Children children: any;
	@Attributes attrs: any;
	@Refs refs: any;
	@RouteParams params: any;
	@Inject('example.a') serviceA: any;
	@Inject('example.b') serviceB: any;
}

@Component(function(this: TestComponentB) {
	return (<div>{this.children}</div>);
})
export class TestComponentB {
	@Children children: any;
}

export const component = (
	<TestComponentB example={123}>
		<div>Hello</div>
	</TestComponentB>
);