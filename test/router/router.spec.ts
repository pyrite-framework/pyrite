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
	DefaultComponent
 } from "./mocks";

describe("Router", () => {

	let route: any;

	beforeEach(() => {
		MainComponent.prototype.$onCreateRoute = () => {};
		ChildComponent.prototype.$onCreateRoute = () => {};
		OtherChildComponent.prototype.$onCreateRoute = () => {};
		BrotherComponent.prototype.$onCreateRoute = () => {};

		m.render(document.body, m({ view: () => {} }));

		route = router.build(routerConfig as any);
	});

	it("should render root route", (done) => {
		MainComponent.prototype.$onCreateRoute = () => {
			const component = (<any>document).body.vnodes[0];

			expect(component.state).to.be.instanceOf(MainComponent);
			sinon.assert.called(component.state.$onInitRoute);

			done();
		};

		m.route(document.body, "/", route);
	});

	it("should load child route", (done) => {
		ChildComponent.prototype.$onCreateRoute = () => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];

			expect(main.state).to.be.instanceOf(MainComponent);
			expect(children.state).to.be.instanceOf(ChildComponent);
			
			sinon.assert.callOrder(main.state.$onInitRoute, children.state.$onInitRoute);
			
			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child");
	});

	it("should load sub child route", (done) => {
		OtherChildComponent.prototype.$onCreateRoute = () => {
			const main = (<any>document).body.vnodes[0];
			const children = main.children[0];
			const other = children.children[0];
			
			sinon.assert.called(children.state.$onInitRoute);
			sinon.assert.called(other.state.$onInitRoute);
			
			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child/other");
	});

	it("should load brother and destroy other routes", (done) => {
		let main: any, children: any, other: any;

		OtherChildComponent.prototype.$onCreateRoute = () => {
			main = (<any>document).body.vnodes[0];
			children = main.children[0];
			other = children.children[0];

			m.route.set("/brother")
		};

		BrotherComponent.prototype.$onCreateRoute = () => {			
			const brother = main.children[0];

			sinon.assert.called(other.state.$onRemoveRoute);
			sinon.assert.called(children.state.$onRemoveRoute);
			sinon.assert.called(brother.state.$onInitRoute);

			done();
		};

		m.route(document.body, "/", route);

		m.route.set("/child/other");
	});


	it("should call $onInitRoute of new children and call $onRemoveRoute of previous", (done) => {
		let main: any, children: any, other: any;
		
		OtherChildComponent.prototype.$onCreateRoute = function () {
			if (this.props.key === "another") {
				const another = children.children[0];

				sinon.assert.callOrder(another.state.$onInitRoute, other.state.$onRemoveRoute);

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
		DefaultComponent.prototype.$onCreateRoute = () => {
			expect(m.route.get()).to.be.equal('/abstract/default');
			done();
		};
		
		m.route(document.body, "/", route);

		m.route.set("/abstract");
	});

});
