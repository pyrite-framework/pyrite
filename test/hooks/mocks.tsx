import { Component, Template, m } from "../../src";
import * as sinon from "sinon";

@Template(function(this: TestHook) {
	return (
		<div>{this.text}</div>
	);
})
export class TestHook implements Component<any> {
	text: string;
	$onInit = sinon.spy();
	$onCreate = sinon.spy();
	$onBeforeUpdate = sinon.spy();
	$onUpdate = sinon.spy();
	$onBeforeRemove = sinon.spy();
	$onRemove = sinon.spy();
}


export const testHook: any = (
	<TestHook></TestHook>
);
