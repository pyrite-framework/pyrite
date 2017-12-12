import { Component, Template, m } from "../../src";
import * as sinon from "sinon";

@Template(function(this: TestHook) {
	return (
		<div>{this.text}</div>
	);
})
export class TestHook extends Component<any> {
	text: string;
	
	constructor(args: any) {
		super(args);

		this.$onInit = sinon.spy();
		this.$onCreate = sinon.spy();
		this.$onBeforeUpdate = sinon.spy();
		this.$onUpdate = sinon.spy();
		this.$onBeforeRemove = sinon.spy();
		this.$onRemove = sinon.spy();
	}
}


export const testHook: any = (
	<TestHook></TestHook>
);
