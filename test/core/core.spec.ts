var jsdom = require('jsdom-global');

import { expect, assert } from "chai";

import { loadPyrite, MainComponent, MainComponentInject } from "./mocks";
import { Injections } from "../../src/pyrite";

describe('Core', () => {
	beforeEach(() => {
		jsdom();
	});

	it('should have injections', (done) => { 
		loadPyrite(MainComponentInject, true, () => {
			expect(Injections.example).not.to.be.undefined;
			done();
		});
	});

	it('should have injected the injection', (done) => { 
		loadPyrite(MainComponentInject, true, () => {
			const service = (<any>document.body).vnodes[0].state.service;
			expect(service).not.to.be.undefined;

			done();
		});
	});

	it('should not have injections', (done) => { 
		loadPyrite(MainComponent, false, () => {
			expect(Injections.example).to.be.undefined;
			done();
		});
	});

	it('should not have injected the injection', (done) => { 
		loadPyrite(MainComponent, false, () => {
			const service = (<any>document.body).vnodes[0].state.service;
			expect(service).to.be.undefined;

			done();
		});
	});
});