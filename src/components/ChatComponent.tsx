import { Template, Render } from "../pyrite";

@Template((ctrl: ChatComponent) => {
	const chats = ctrl.chats.map((chat: any, id: string) =>
		<p id={id}> {chat.nick}: {chat.msg} </p>
	);

	return (
		<div>
			<div>{chats}</div>
			Nick <input type="text" oninput={ctrl.change.bind(ctrl, "nick")}/>
			Msg <input type="text" oninput={ctrl.change.bind(ctrl, "msg")}/>
			<button onclick={ctrl.sendChat.bind(ctrl)}>Send</button>
		</div>
	);
})
export class ChatComponent {
	chats: any = [];
	message: any = {};

	change(element: string, event: any): void {
		this.message[element] = event.target.value;
	}

	sendChat(): void {
		this.addChat({
			msg: this.message.msg,
			nick: this.message.nick
		});
	}

	addChat(chat: any): void {
		this.chats.push(chat);
	}
}
