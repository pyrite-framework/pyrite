import { Template, Render } from "../pyrite";
import { Input } from "./Input";
import { Chat } from "./Chat";


export function ChatTemplate (this: Chat) {
	const chats = this.chats.map((chat: any, id: string) =>
		<div id={id} class="alert alert-warning" role="alert">
			<strong>{chat.nick}:</strong> {chat.msg}
		</div>
	);

	return (
		<div class="container-fluid" style={{marginTop: "50px"}}>
			<div class="row justify-content-center">
				<div class="col-10">{chats}</div>
			</div>
			<Input ctrl={this} title="Nick" field="nick" />
			<Input ctrl={this} title="Text" field="msg" />
			<div class="row justify-content-center">
				<button class="btn btn-outline-danger" onclick={this.sendChat.bind(this)}>Send</button>
			</div>
		</div>
	);
}