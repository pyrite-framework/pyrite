import { Pyrite, Inject, Component, Render } from "../../src";

@Component(function(this: MainComponent) {
	return (
		<div>
			<div>Main</div>
		</div>
	);
})
export class MainComponentInject {
	@Inject("example") service: any;
}

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

export function loadPyrite(Component: any, inject?: Boolean, onRouteChange?: Function) {
	const config: any = {
		routes: [{
			path: "/",
			component: Component,
			attrs: {
				oncreate: onRouteChange
			}
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