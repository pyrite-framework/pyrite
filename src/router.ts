import * as m from "mithril";

export const RouteParams: any = {}

export class Router {
	routes: any;
	rootElement: any;
	rootPath: string;
	config: any;

	constructor(config: any) {
		this.rootElement = config.rootElement || document.body;
		this.rootPath = config.rootPath || "/";

		if (config.prefix) m.route.prefix(config.prefix);

		this.config = config;
		this.routes = this.buildRoutes(config.routes);
	}

	buildRoutes(configRoutes: any, currentRoutes: Array<any> = [], routes: any = {}): any {
		configRoutes.forEach((route: any) => {
			const nextRoutes = currentRoutes.slice();
			nextRoutes.unshift(route);
			let path = nextRoutes.reverse().map((element) => element.path).join("");

			path = path.split("//").join("/");

			const fooRoutes = nextRoutes.slice();
			const lastRoute = fooRoutes.pop();

			let oldPath = this.rootPath;

			routes[path] = this.createRoute(fooRoutes, lastRoute, this.config);

			if (route.routes) {
				this.buildRoutes(route.routes, nextRoutes, routes);
			}
		});

		return routes;
	}

	addOnCreate(lastRoute: any, config: any, path: any) {
		lastRoute.attrs.oncreate = () => {
			if (config.onRouteChange) {
				return new Promise((resolve) => {
					const result = config.onRouteChange(path.newPath);
					return resolve(result);
				});
			}
		};
	}

	addKeys(lastRoute: any, args: any) {
		const params = lastRoute.path.split("/");

		const validParams = params
		.map((param: string) => param.includes(":") ? args[param.substring(1, param.length)] : "")
		.join("/");

		lastRoute.attrs.key = validParams;
	}

	createRoute(fooRoutes: any, lastRoute: any, config: any) {
		let path = {
			newPath: this.rootPath
		};

		lastRoute.attrs = lastRoute.attrs || {};

		if (!lastRoute.attrs.oncreate) this.addOnCreate(lastRoute, config, path);

		const route: any = {
			onmatch: (args: any, newPath: any) => {
				if (lastRoute.path.includes(":")) this.addKeys(lastRoute, args);
				path.newPath = newPath;
			},

			render(args: any) {
				if (!Object.keys(args.attrs).length) {
					Object.keys(RouteParams).forEach((attr: string) => {
						delete RouteParams[attr];
					});
				} else {
					Object.assign(RouteParams, args.attrs);
				}

				var render = fooRoutes.reduce((prev: any, next: any) => {
					return m(next.component, next.attrs, prev);
				}, m(lastRoute.component, lastRoute.attrs));

				return render;
			}
		};

		return route;
	}

	run() {
		m.route(this.rootElement, this.rootPath, this.routes);
	}
}
