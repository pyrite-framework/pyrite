import { m, Template, Component } from "../../src";

interface TestComponentAttributes {
	example: string;
}

@Template(function(this: TestComponent) {
	return (
		<div>
			<p>{this.props.example}</p>
			<span>{this.children}</span>
		</div>
	);
})
class TestComponent extends Component<TestComponentAttributes> {
	loaded: Boolean;

	$onCreate(args: any) {
		this.loaded = true;
	}
}

class NoTemplateComponent extends Component<any> {}

export const testComponent: any = (
	<TestComponent example="value">
		<p>Children</p>
	</TestComponent>
);

export const noTemplateComponent: any = (
	<NoTemplateComponent></NoTemplateComponent>
);