var jsdom = require('jsdom-global');

import { expect, assert } from "chai";

import { loadPyrite } from "./mocks";
import { Injections } from "../../src/pyrite";

jsdom();
loadPyrite(false);

describe('Core', () => {
	it('should have injections', () => { 
		jsdom();
		loadPyrite(true);

		expect(Injections.example).not.to.be.undefined;
	});

	it('should have injected the injection', (done) => { 
		setTimeout(() => {
			const service = (<any>document.body).vnodes[0].state.service;
			expect(service).not.to.be.undefined;

			done();
		}, 10)
	});
});