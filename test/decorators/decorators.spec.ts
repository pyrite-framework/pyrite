import "../config.ts";
import { expect } from "chai";

import { TestComponent, TestComponentB, component } from "./mocks";

const testPrototype: any = TestComponent.prototype;

describe('Decorators', () => {
  it('should create a component correctly', () => { 
    expect(component.children[0].text).to.equal('Hello');
    expect(component.attrs.example).to.equal(123);
  });

  it('should inject children correctly', () => { 
    expect(testPrototype.__children).to.equal('children');
  });

  it('should inject attributes correctly', () => { 
    expect(testPrototype.__attributes).to.equal('attrs');
  });

  it('should inject refs correctly', () => { 
    expect(testPrototype.__refs).to.equal('refs');
  });

  it('should inject routeparams correctly', () => { 
    expect(testPrototype.__routeParams).to.equal('params');
  });

  it('should inject injections correctly', () => { 
    expect(testPrototype.__inject).to.deep.include({
    	name: 'example.a',
    	method: 'serviceA'
    });

    expect(testPrototype.__inject).to.deep.include({
    	name: 'example.b',
    	method: 'serviceB'
    });
  });
});