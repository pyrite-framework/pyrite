import * as m from "mithril";
import { Component } from "./component";

export interface Route {
	path: string;
	component: Component<any>;
	abstract?: boolean;
	default?: string;
	routes?: Array<Route>;
	attrs?: {[key: string]: any};
}

export interface RouteResolver {
	onmatch(args: m.Vnode, newPath: m.Vnode): any;
	render(args: any): any;
}

export type Routes = Array<Route>;

export type RouteConfig = {[key: string]: RouteResolver};

export class Router {
	build(configRoutes: Routes, currentRoutes: Routes = [], routes: RouteConfig = {}): RouteConfig {
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
		lastRoute.attrs = lastRoute.attrs || {};

		const argsKeys = Object.keys(args);

		if (argsKeys.length) {
			lastRoute.attrs.key = argsKeys.map((key) => args[key]).join("/");
		}
	}

	private createRoute(nextRoutes: Routes): RouteResolver {
		const otherRoutes = nextRoutes.slice();
		const lastRoute = otherRoutes.pop() as Route;

		const route = {
			onmatch: this.onmatch.bind(this, lastRoute),
			render: this.render.bind(this, otherRoutes, lastRoute)
		};

		return route;
	}

	private onmatch(lastRoute: Route, args: m.Vnode, newPath: m.Vnode) {
		this.addKeys(lastRoute, args);

		if (lastRoute.abstract && lastRoute.default) {
			m.route.set(newPath + lastRoute.default);
		}
	}

	private render(otherRoutes: Routes, lastRoute: Route, args: m.Vnode) {
		return otherRoutes.reduce((prev: m.Children, next: Route) => {
			return m(next.component as m.Component, next.attrs as m.Attributes, prev);
		}, m(lastRoute.component as m.Component, lastRoute.attrs as m.Attributes));
	}
}

export const router = new Router();
