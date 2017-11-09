import "../config.ts";
import { expect, assert } from "chai";
import * as m from "mithril";
import * as sinon from "sinon";

import { TestComponent } from "./mocks";
import { PyriteComponent } from "../../src/component";

function draw(Component: any) {
	const component = m(Component, {
		example: 'value'
	}, [m('div', 'children')]);

	m.render(document.body, component);

	return component;
}

describe('Component', () => {
	let component: any = draw(TestComponent);

	before(function() {
		component = draw(TestComponent);
  	});

	describe('Decorators', () => {
		it('should create a component correctly', () => { 
			expect(component.state.loaded).to.be.true;
		});

		it('should inject children correctly', () => { 
			expect(component.state.children).to.not.be.undefined;
			expect(component.state.children[0]).to.deep.include({ text: "children"});
		});

		it('should inject attributes correctly', () => { 
			expect(component.state.attrs).to.not.be.undefined;
			expect(component.state.attrs.example).to.equal('value');
		});

		it('should inject refs correctly', () => { 
			expect(component.state.refs).to.not.be.undefined;
			expect(component.state.refs.example).to.be.an.instanceof(HTMLElement);
			expect(component.state.refs.component.loaded).to.be.true;
			expect(component.state.refs.subcomponent).to.be.undefined;
		});

		it('should inject routeparams correctly', () => { 
			expect(component.state.params).to.not.be.undefined;
		});
	 
		it('should inject injections correctly', () => { 
			expect(component.state.service).to.not.be.undefined;
			expect(component.state.serviceGet).to.not.be.undefined;
		});
	});
});