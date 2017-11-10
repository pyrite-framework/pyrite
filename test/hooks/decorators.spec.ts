var cleanup = require('jsdom-global')()
import * as m from "mithril";
import * as sinon from "sinon";

import { TestHook } from "./mocks";

describe('Hooks', () => {
	let component = m(TestHook as any);

	before(function() {
		m.render(document.body, component);
  	});

	it('should call $onInit and then $onCreate', () => {
		sinon.assert.callOrder(component.state.$onInit, component.state.$onCreate);
	});

	it('should call $onBeforeUpdate and then $onUpdate', () => {
		component = m(TestHook as any);
		m.render(document.body, component);

		sinon.assert.callOrder(component.state.$onBeforeUpdate, component.state.$onUpdate);
	});

	it('should call $onBeforeRemove and then $onRemove', () => {
		m.render(document.body, m({
			view: () => {} 
		}));

		sinon.assert.callOrder(component.state.$onBeforeRemove, component.state.$onRemove);
	});
});