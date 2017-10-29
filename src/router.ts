import * as m from "mithril";

export const RouteParams: any = {}

export class Router {
	routes: any;
	rootElement: any;
	rootPath: string;

	constructor(config: any) {
		this.rootElement = config.rootElement || document.body;
		this.rootPath = config.rootPath || "/";

		this.routes = this.buildRoutes(config.routes);
	}

	buildRoutes(configRoutes: any, currentRoutes: Array<any> = [], routes: any = {}): any {
		configRoutes.forEach((route: any) => {
			const nextRoutes = currentRoutes.slice();
			nextRoutes.unshift(route);
			let path = nextRoutes.reverse().map((element) => element.path).join("");

			path = path.split("//").join("/");

			if (path[0] !== "/") path = "/" + path;

			const fooRoutes = nextRoutes.slice();
			const lastRoute = fooRoutes.pop();

			routes[path] = {
				view(args: any) {
					Object.assign(RouteParams, args.attrs);

					const render = fooRoutes.reduce((prev: any, next: any, i: any) => {
						return m(next.component, next.attrs, prev);
					}, m(lastRoute.component, lastRoute.attrs));

					return render;
				}
			};

			if (route.routes) {
				this.buildRoutes(route.routes, nextRoutes, routes);
			}
		});

		return routes;
	}

	run() {
		m.route(this.rootElement, this.rootPath, this.routes);
	}
}
