import * as m from "mithril";
import { Component } from "./component";

export interface Route {
	path: string;
	component: Component<any> | typeof Component;
	abstract?: boolean;
	default?: string;
	routes?: Array<Route>;
	props?: m.Attributes & {[key: string]: any};
}

export type Routes = Array<Route>;

export class Router {
	build(configRoutes: Routes, currentRoutes: Routes = [], routes: m.RouteDefs = {}): m.RouteDefs {
		configRoutes.forEach((route: Route) => {
			const nextRoutes = currentRoutes.slice();

			nextRoutes.push(route);

			let allPaths = nextRoutes.map((element) => element.path);
			const path = allPaths.join("").split("//").join("/");

			routes[path] = this.createRoute(nextRoutes);

			if (route.routes) this.build(route.routes, nextRoutes, routes);
		});

		return routes;
	}

	private addKeys(lastRoute: Route, args: {[key: string]: any}): void {
		lastRoute.props = lastRoute.props || {};

		if(lastRoute.props && args.state) {
			lastRoute.props.state = args.state;
		}

		const argsKeys = Object.keys(args);

		if (lastRoute.props && argsKeys.length) {
			lastRoute.props.key = argsKeys.map((key) => args[key]).join("/");
		}
	}

	private createRoute(nextRoutes: Routes): m.RouteResolver<m.Attributes, any> {
		const otherRoutes = nextRoutes.slice();
		const lastRoute = otherRoutes.pop() as Route;

		const route = {
			onmatch: this.onmatch.bind(this, lastRoute),
			render: this.render.bind(this, otherRoutes, lastRoute)
		};

		return route;
	}

	private onmatch(lastRoute: Route, args: m.Vnode<m.Attributes, any>, newPath: string) {
		this.addKeys(lastRoute, args);

		if (lastRoute.abstract && lastRoute.default) {
			m.route.set(newPath + lastRoute.default);
		}

		return lastRoute.component;
	}

	private render(otherRoutes: Routes, lastRoute: Route) {
		const render = otherRoutes.reduce((prev: m.Children, next: Route) => {
			return m(next.component as any, next.props as m.Attributes, prev);
		}, m(lastRoute.component as any, lastRoute.props as m.Attributes));

		return render;
	}
}

export const router = new Router();
