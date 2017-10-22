import * as m from "mithril";

declare global {
	namespace JSX {
		interface ElementClass {
			[key: string]: any;
		}
		interface Element {
			[key: string]: any;
		}
		interface ElementChildrenAttribute {
			[key: string]: any;
		}
		interface IntrinsicAttributes {
			[key: string]: any;
		}
		interface IntrinsicClassAttributes {
			[key: string]: any;
		}
		interface IntrinsicElements {
			[key: string]: any;
		}
	}
}
