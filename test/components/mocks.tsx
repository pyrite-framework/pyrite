import { m, Template, Component } from "../../src";

interface TestComponentAttributes {
	example: string;
}

@Template(function(this: TestComponent) {
	return (
		<div>
			<p>{this.props.example}</p>
			<span>{this.children}</span>
			<NoTemplateComponent bnbn={"hola"} ref={(component: NoTemplateComponent) => this.childComponent = component} example="othervalue"></NoTemplateComponent>
		</div>
	);
})
class TestComponent extends Component<TestComponentAttributes> {
	loaded: Boolean;
	childComponent: NoTemplateComponent;

	$onCreate() {
		this.loaded = true;
	}
}

export class NoTemplateComponent extends Component<any> {}

export const testComponent: any = (
	<TestComponent example="value">
		<p>Children</p>
	</TestComponent>
);

export const noTemplateComponent: any = (
	<NoTemplateComponent></NoTemplateComponent>
);
