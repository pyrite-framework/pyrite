var jsdom = require('jsdom-global');

import { expect, assert } from "chai";

import { loadPyrite } from "./mocks";
import { Injections } from "../../src/pyrite";

describe('Core', () => {
	beforeEach(() => {
		jsdom();
	});

	it('should have injections', (done) => { 
		loadPyrite(true, () => {
			expect(Injections.example).not.to.be.undefined;
			done();
		});
	});

	it('should have injected the injection', (done) => { 
		loadPyrite(false, () => {
			const service = (<any>document.body).vnodes[0].state.service;
			expect(service).not.to.be.undefined;

			done();
		});
	});
});