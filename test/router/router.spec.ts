import { expect, assert } from "chai";
import * as m from "mithril";
import * as sinon from "sinon";

import { RouteParams } from "../../src/router";
import { createRouter, createRouterForRouteChange } from "./mocks";

var jsdom = require('jsdom-global');

describe("Router", () => {
	let router: any;

	beforeEach(() => {
		jsdom();
	});

	it("should render root route", (done) => {
		router = createRouterForRouteChange((to: any) => {
			const component = (<any>document).body.vnodes[0];

			expect(component.state.name).to.equal("MainComponent");
			sinon.assert.called(component.state.$onInit);

			done();
		});

		router.run(); 
	});

	it("should load child route", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child'){
				const main = (<any>document).body.vnodes[0];
				const children = main.children[0];
	
				expect(children.state.name).to.equal("ChildComponent");
				sinon.assert.called(children.state.$onInit);
				
				done();
			}
		});

		router.run();

		m.route.set('/child');
	});

	it("should load sub child route", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child/other'){
				const main = (<any>document).body.vnodes[0];
				const children = main.children[0];
				const other = children.children[0];
				
				sinon.assert.called(children.state.$onInit);
				sinon.assert.called(other.state.$onInit);
				
				done();
			}
		});

		router.run();

		m.route.set('/child/other');
	});

	it("should load brother and destroy other routes", (done) => {
		let children: any;
		let other: any;
		let main: any;

		router = createRouterForRouteChange((to: any) => {
			if (to === "/child/other") {
				main = (<any>document).body.vnodes[0];
				children = main.children[0];
				other = children.children[0];
			} else if (to === '/brother'){
				const brother = main.children[0];

				sinon.assert.called(other.state.$onRemove);
				sinon.assert.called(children.state.$onRemove);
				sinon.assert.called(brother.state.$onInit);

				done();
			}
		});

		router.run();

		m.route.set('/child/other');
		setTimeout(() => m.route.set('/brother'), 10);
	});

	it("should load param routes", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child/example'){
				expect(RouteParams.id).to.equal('example');
				done();
			}
		});

		router.run();

		m.route.set('/child/example');
	});

	it("should change param routes", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child/other'){
				expect(RouteParams.id).to.equal('other');
				done();
			}
		});

		router.run();

		m.route.set('/child/other');
	});

	it("should call $onInit of new children and call $onRemove of previous", (done) => {
		let main: any;
		let children: any;
		let other: any;

		router = createRouterForRouteChange((to: any) => {
			if (to === '/child/other') {
				main = (<any>document).body.vnodes[0];
				children = main.children[0];
				other = children.children[0];
			} else if (to === '/child/another'){
				main = (<any>document).body.vnodes[0];
				children = main.children[0];
				const another = children.children[0];

				expect(RouteParams.id).to.equal('another');

				sinon.assert.callOrder(another.state.$onInit, other.state.$onRemove);

				done();
			}
		});

		router.run();

		m.route.set("/child/other");

		setTimeout(() => m.route.set("/child/another"), 10);
	});

	it("should delete param routes", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child'){
				expect(RouteParams.id).to.be.undefined;
				done();
			}
		});
		router.run();

		m.route.set('/child');
	});

	it("should set default path", () => {
		router.rootPath = "/child";
		router = createRouter();
		router.run();

		expect(m.route.get()).to.equal("/child");
	});

	it("should set default prefix", () => {
		router = createRouter({
			prefix: "#"
		});

		router.run();

		expect(router.config.prefix).to.equal("#");
	});

	it("should set default HTML element", (done) => {
		const element: any = document.createElement("div");

		router = createRouterForRouteChange((to: any) => {
			expect(element.vnodes[0].state).to.not.be.undefined;
			done();
		});

		router.rootElement = element;

		router.run();
	});

	it("should call onRouteChange", (done) => {
		router = createRouterForRouteChange((to: any) => {
			if (to === '/child/example'){
				done();
			}
		});
		
		router.run();

		m.route.set('/child/example');
	});

});