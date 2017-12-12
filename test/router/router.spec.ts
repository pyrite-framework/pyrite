require("jsdom-global")();

import { expect, assert } from "chai";
import * as m from "mithril";
import * as sinon from "sinon";
import { router } from "../../src";

import { 
	routerConfig,
	MainComponent,
	ChildComponent,
	OtherChildComponent,
	BrotherComponent,
	AbstractComponent,
	DefaultComponent,
	DisabledComponent
 } from "./mocks";

describe("Router", () => {

	let route: any;

	beforeEach(() => {
		MainComponent.prototype.$onCreate = () => {};
		ChildComponent.prototype.$onCreate = () => {};
		OtherChildComponent.prototype.$onCreate = () => {};
		BrotherComponent.prototype.$onCreate = () => {};

		m.render(document.body, m({ view: () => {} }));

		route = router.build(routerConfig as any);
	});

	it("should render root route", (done) => {
		MainComponent.prototype.$onCreate = () => {
			const component = (<any>document).body.vnodes[0];

			expect(component.state).to.be.instanceOf(MainComponent);
			sinon.assert.called(component.state.$onInit);

			done();
		};

		m.route(document.body, "/", route);
	});

	it("should load child route", (done) => {
		ChildComponent.prototype.$onCreate = () => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];

			expect(main.state).to.be.instanceOf(MainComponent);
			expect(children.state).to.be.instanceOf(ChildComponent);
			
			sinon.assert.callOrder(main.state.$onInit, children.state.$onInit);
			
			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child");
	});

	it("should load sub child route", (done) => {
		OtherChildComponent.prototype.$onCreate = () => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];
			const other = children.children[0];
			
			sinon.assert.called(children.state.$onInit);
			sinon.assert.called(other.state.$onInit);
			
			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child/other");
	});

	it("should load brother and destroy other routes", (done) => {
		let main: any, children: any, other: any;

		OtherChildComponent.prototype.$onCreate = () => {
			main = (<any>document).body.vnodes[0];
			children = main.children[0];
			other = children.children[0];

			m.route.set("/brother")
		};

		BrotherComponent.prototype.$onCreate = () => {			
			const brother = main.children[0];

			sinon.assert.called(other.state.$onRemove);
			sinon.assert.called(children.state.$onRemove);
			sinon.assert.called(brother.state.$onInit);

			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child/other");
	});


	it("should call $onInit of new children and call $onRemove of previous", (done) => {
		let main: any, children: any, other: any;
		
		OtherChildComponent.prototype.$onCreate = function () {
			if (this.props.key === "another") {
				const another = children.children[0];

				sinon.assert.callOrder(another.state.$onInit, other.state.$onRemove);

				return done();
			}

			main = (<any>document).body.vnodes[0];
			children = main.children[0];
			other = children.children[0];

			m.route.set("/child/another");
		};

		m.route(document.body, "/", route);

		m.route.set("/child/other");
	});

	it("should call default route when is abstract", (done) => {
		DefaultComponent.prototype.$onCreate = () => {
			expect(m.route.get()).to.be.equal('/abstract/default');
			done();
		};
		
		m.route(document.body, "/", route);

		m.route.set("/abstract");
	});

	it("should draw everything when preventDraw is false", (done) => {
		DisabledComponent.prototype.$onInit = function () {
			this.preventDraw = false;
		};

		DisabledComponent.prototype.$onCreate = function (args: any) {
			expect(args.dom).to.not.be.undefined;

			done();
		};
		
		m.route(document.body, "/", route);

		m.route.set("/disabled");
	});

	it("should draw anything when preventDraw is true", (done) => {
		DisabledComponent.prototype.$onInit = function () {
			this.preventDraw = true;
		};

		DisabledComponent.prototype.$onCreate = function (args: any) {
			expect(args.dom).to.be.undefined;

			done();
		};
		
		m.route(document.body, "/", route);

		m.route.set("/disabled");
	});

});
