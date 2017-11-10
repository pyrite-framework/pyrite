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

export function loadPyrite(inject?: Boolean, onRouteChange?: Function) {
	const config: any = {
		onRouteChange: onRouteChange,
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