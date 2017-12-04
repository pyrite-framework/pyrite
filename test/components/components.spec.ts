require('jsdom-global')();

import { m } from "../../src";
import { expect } from "chai";

import { testComponent, noTemplateComponent, NoTemplateComponent } from "./mocks";

describe('Component', () => {

	before(() => {
		m.render(document.body, testComponent);
	});

	it('should create a component correctly', () => {
		expect((document.body as any).vnodes[0].state.loaded).to.be.true;
	});

	it('should inject attributes correctly', () => {
		expect(testComponent.state.props).to.not.be.undefined;
		expect(testComponent.state.props.example).to.equal("value");
	});

	it('should inject children correctly', () => {
		expect(testComponent.state.children).to.not.be.undefined;
		expect(testComponent.state.children[0]).to.deep.include({ text: "Children" });
	});

	it('should inject components ref correctly', () => {
		expect(testComponent.state.childComponent).to.be.instanceOf(NoTemplateComponent);
		expect(testComponent.state.childComponent.props.example).to.equal("othervalue");
	});

	it('should have template', () => {
		expect(testComponent.children).to.be.not.empty;
	});

	it('should delete a component correctly', () => {
		m.render(document.body, m({ view: () => {} }));

		expect((document.body as any).vnodes[0].state.loaded).to.be.undefined;
	});

	it('should have not template', () => {
		m.render(document.body, noTemplateComponent);

		expect(noTemplateComponent.children).to.be.empty;
	});

});
