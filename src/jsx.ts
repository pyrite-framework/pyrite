import * as m from "mithril";

declare global {
	namespace JSX {
		interface Element {}

        interface ElementClass {}

        interface ElementAttributesProperty {
        	props: {}
        }

        interface ElementChildrenAttribute {
        	children: {}
        }

        interface IntrinsicAttributes {}

        interface IntrinsicClassAttributes<T> {}

		interface IntrinsicElements {
			[key: string]: any;
		}
	}
}
