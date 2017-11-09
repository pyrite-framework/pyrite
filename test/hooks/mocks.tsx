import { Render, Component } from "../../src";
import * as sinon from "sinon";

@Component(() => {})
export class TestHook {
	$onInit: sinon.SinonSpy;
	$onCreate: sinon.SinonSpy;
	$onBeforeUpdate: sinon.SinonSpy;
	$onUpdate: sinon.SinonSpy;
	$onBeforeRemove: sinon.SinonSpy;
	$onRemove: sinon.SinonSpy;

	text: string;

	constructor() {
		this.$onInit = sinon.spy();
		this.$onCreate = sinon.spy();
		this.$onBeforeUpdate = sinon.spy();
		this.$onUpdate = sinon.spy();
		this.$onBeforeRemove = sinon.spy();
		this.$onRemove = sinon.spy();
	}
}
