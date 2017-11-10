import { expect, assert } from "chai";
import * as m from "mithril";
import * as sinon from "sinon";

import { RouteParams } from "../../src/router";
import { createRouter } from "./mocks";

var jsdom = require('jsdom-global');

describe("Router", () => {
	let router: any;

	beforeEach(() => {
		jsdom();
	});

	it("should render root route", (done) => {
		router = createRouter();
		router.run(); 

		setTimeout(() => {
			const component = (<any>document).body.vnodes[0];

			expect(component.state.name).to.equal("MainComponent");
			sinon.assert.called(component.state.$onInit);

			done();
		}, 10);
	});

	it("should load child route", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child');

		setTimeout(() => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];

			expect(children.state.name).to.equal("ChildComponent");
			sinon.assert.called(children.state.$onInit);
			
			done();
		}, 10);
	});

	it("should load sub child route", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child/other');

		setTimeout(() => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];
			const other = children.children[0];
			
			sinon.assert.called(children.state.$onInit);
			sinon.assert.called(other.state.$onInit);
			
			done();
		}, 10);
	});

	it("should load brother and destroy other routes", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child/other');

		setTimeout(() => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];
			const other = children.children[0];

			m.route.set('/brother');
		
			setTimeout(() => {
				const brother = main.children[0];

				sinon.assert.called(other.state.$onRemove);
				sinon.assert.called(children.state.$onRemove);
				sinon.assert.called(brother.state.$onInit);

				done();
			}, 10);
		}, 10);
	});

	it("should load param routes", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child/example');
		
		setTimeout(() => {
			expect(RouteParams.id).to.equal('example');
			done();
		}, 10);
	});

	it("should change param routes", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child/other');
		
		setTimeout(() => {
			expect(RouteParams.id).to.equal('other');
			done();
		}, 10);
	});

	it("should delete param routes", (done) => {
		router = createRouter();
		router.run();

		m.route.set('/child');

		setTimeout(() => {
			expect(RouteParams.id).to.be.undefined;
			done();
		}, 10);
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
		router = createRouter();
		router.rootElement = element;

		router.run();

		setTimeout(() => {
			expect(element.vnodes[0].state).to.not.be.undefined;
			done();
		}, 10);
	});

	it("should call onRouteChange", (done) => {
		router = createRouter({
			onRouteChange: sinon.spy()
		});
		
		router.run();

		m.route.set('/child/example');

		setTimeout(() => {
			sinon.assert.called(router.config.onRouteChange);

			done();
		}, 10);
	});

});