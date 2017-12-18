import * as m from "mithril";

export type Children = m.Children | JSX.Element | null | void;

export interface DefaultAttributes<Attributes> {
	ref?: (component: Component<Attributes>) => void;
	key?: string | number;
}

export interface Component<Attributes> {
	props?: Attributes & DefaultAttributes<Attributes>;
	children?: m.Children;
	preventDraw?: boolean;
	decorators?: any;

	$onInit?: Function;
	$onCreate?: Function;
	$onBeforeUpdate?: Function;
	$onUpdate?: Function;
	$onBeforeRemove?: Function;
	$onRemove?: Function;
}