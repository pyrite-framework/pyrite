import * as m from "mithril";
import { RouteComponent } from "./route";

export interface Route {
	path: string;
	component: RouteComponent<any> | typeof RouteComponent;
	abstract?: boolean;
	default?: string;
	routes?: Array<Route>;
	props?: {[key: string]: any};
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
		const argsKeys = Object.keys(args);

		if (lastRoute.props && argsKeys.length) {
			lastRoute.props.key = argsKeys.map((key) => args[key]).join("/");
		}
	}

	private createRoute(nextRoutes: Routes): m.RouteResolver {
		const otherRoutes = nextRoutes.slice();
		const lastRoute = otherRoutes.pop() as Route;

		this.setHooks(lastRoute);

		const route = {
			onmatch: this.onmatch.bind(this, lastRoute),
			render: this.render.bind(this, otherRoutes, lastRoute)
		};

		return route;
	}

	private setHooks(route: Route) {
		route.props = route.props || {};

		route.props.oninit = function (this: RouteComponent<any>, args: m.Vnode) {
			return this.$onInitRoute(args);
		};

		route.props.oncreate = function (this: RouteComponent<any>, args: m.Vnode) {
			return this.$onCreateRoute(args);
		};

		route.props.onbeforeupdate = function (this: RouteComponent<any>, args: m.Vnode, oldArgs: m.Vnode) {
			return this.$onBeforeUpdateRoute(args, oldArgs);
		};

		route.props.onupdate = function (this: RouteComponent<any>, args: m.Vnode) {
			return this.$onUpdateRoute(args);
		};

		route.props.onbeforeremove = function (this: RouteComponent<any>, args: m.Vnode) {
			return this.$onBeforeRemoveRoute(args);
		};

		route.props.onremove = function (this: RouteComponent<any>, args: m.Vnode) {
			return this.$onRemoveRoute(args);
		};
	}

	private onmatch(lastRoute: Route, args: m.Vnode, newPath: string) {
		this.addKeys(lastRoute, args);

		if (lastRoute.abstract && lastRoute.default) {
			m.route.set(newPath + lastRoute.default);
		}
	}

	private render(otherRoutes: Routes, lastRoute: Route, args: m.Vnode) {
		return otherRoutes.reduce((prev: m.Children, next: Route) => {
			return m(next.component as m.Component, next.props as m.Attributes, prev);
		}, m(lastRoute.component as m.Component, lastRoute.props as m.Attributes));
	}
}

export const router = new Router();
