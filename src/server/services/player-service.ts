import { OnStart, Service } from "@flamework/core";
import Charm, { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { Players } from "@rbxts/services";
import { ServerEvents } from "shared/events";

@Service()
export class PlayerService implements OnStart {
	private clicks: Map<Player, number> = new Map();
	private clicksAtom = atom<number>(0);
	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom },
	});

	private clickEvent = new Instance("BindableEvent");
	private getClicksEvent = new Instance("BindableEvent");
	private clicksUpdatedEvent = new Instance("BindableEvent");

	public onStart() {
		this.clickEvent.Event.Connect((player: Player) => {
			this.incrementClicks(player);
		});
		this.getClicksEvent.Event.Connect((player: Player) => {
			this.sendClicksToClient(player);
		});
	}
	public incrementClicks(player: Player) {
		const currentClicks = this.clicks.get(player) || 0;
		this.clicks.set(player, currentClicks + 1);
		this.clicksAtom(this.clicks.get(player) || 0);
		this.syncer.hydrate(player);
		this.sendClicksToClient(player)
	};

	public sendClicksToClient(player: Player) {
		const clicks = this.clicks.get(player) || 0;
		this.clicksUpdatedEvent.Fire(player, clicks);
	}

	//Вызов событий
	public fireClickEvent(player: Player) {
		this.clickEvent.Fire(player);
	}

	public fireGetClicksEvent(player: Player) {
		this.getClicksEvent.Fire(player);
	}

	public connectClicksUpdatedEvent(callback: (player: Player, clicks: number) => void) {
		this.clicksUpdatedEvent.Event.Connect(callback);
	}
}
