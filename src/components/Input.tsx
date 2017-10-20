import { Template, Render } from "../pyrite";

@Template((xnode: any) => {
	const attr = xnode.attrs;
	return (
		<div class="row justify-content-center">
			<div class="form-group col-5">
				<div class="input-group">
					<span class="input-group-addon">{attr.title}</span>
					<input 
						type="text"
						class="form-control"
						placeholder={attr.title}
						value={attr.ctrl.message[attr.field]} 
						onkeypress={attr.ctrl.change.bind(attr.ctrl, attr.field)}
						/>
				</div>
			</div>
		</div>
	);
})
export class Input {
	[key: string]: any;
}