import { Pyrite, Inject, Component, Render } from "../../src";

@Component(function(this: MainComponent) {
	return (
		<div>
			<div>Main</div>
		</div>
	);
})
export class MainComponent {
	@Inject("example") service: any;
}

export function loadPyrite(inject?: Boolean) {
	const config: any = {
		routes: [{
			path: "/",
			component: MainComponent
		}]
	};

	if (inject) {
		config.inject = {
			example: Promise.resolve({
				exampleMethod() {
					return "example";
				}
			})
		}
	}

	return new Pyrite(config);
}