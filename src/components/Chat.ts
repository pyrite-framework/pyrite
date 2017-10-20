import { Template } from "../pyrite";
import { ChatTemplate } from "./ChatTemplate";

@Template(ChatTemplate)
export class Chat {
	chats: any = [];
	message: any = {};

	change(element: string, event: any): any {
		console.log(this);
		if (event.keyCode === 13) this.sendChat(event);
		else {
			event.redraw = false;
			this.message[element] = event.target.value;
		}
	}

	sendChat(event: any): void {
		if (!this.message.msg || !this.message.nick) {
			event.redraw = false;
			return;
		}

		this.addChat({
			msg: this.message.msg,
			nick: this.message.nick
		});
	}

	addChat(chat: any): void {
		this.chats.push(chat);
		this.clean();
	}

	clean() {
		this.message.msg = '';
	}
}
