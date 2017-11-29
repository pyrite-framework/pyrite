import * as m from "mithril";

export class Router {
	build(configRoutes: any, currentRoutes: Array<any> = [], routes: any = {}): any {
		configRoutes.forEach((route: any) => {
			const nextRoutes = currentRoutes.slice();
			nextRoutes.unshift(route);
			let path = nextRoutes.reverse().map((element) => element.path).join("");

			path = path.split("//").join("/");

			const fooRoutes = nextRoutes.slice();
			const lastRoute = fooRoutes.pop();

			routes[path] = this.createRoute(fooRoutes, lastRoute);

			if (route.routes) {
				this.build(route.routes, nextRoutes, routes);
			}
		});

		return routes;
	}

	private addKeys(lastRoute: any, args: any) {
		lastRoute.attrs = lastRoute.attrs || {};

		if (Object.keys(args).length) {
			lastRoute.attrs.key = Object.keys(args).map((key) => args[key]).join("/");
		}
	}

	private createRoute(fooRoutes: any, lastRoute: any) {
		const route: any = {
			onmatch: (args: any, newPath: any) => {
				this.addKeys(lastRoute, args);

				if (lastRoute.abstract) {
					m.route.set(newPath + lastRoute.default);
				}
			},

			render(args: any) {
				var render = fooRoutes.reduce((prev: any, next: any) => {
					return m(next.component, next.attrs, prev);
				}, m(lastRoute.component, lastRoute.attrs));

				return render;
			}
		};

		return route;
	}
}

export const router = new Router();
