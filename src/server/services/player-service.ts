import { OnStart, Service } from "@flamework/core";
import Charm, { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { Players } from "@rbxts/services";
import { ClientEvents, ServerEvents } from "shared/events";

@Service()
export class PlayerService implements OnStart {
	private clicks: Map<Player, number> = new Map();
	private clicksAtom = atom<number>(0);
	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom },
	});
 
	public onStart() {
        ServerEvents.click.connect((player) => {
			const clicks = this.clicks.get(player) ?? 0;
			this.clicks.set(player, clicks + 1);
			ServerEvents.updateClicks.fire(player, clicks + 1);
        });
		Players.PlayerAdded.Connect((player) => {
			const clicksAtom = atom<number>(0);
			this.clicks.set(player, clicksAtom());

			const syncer = CharmSync.server({
				atoms: { clicks: clicksAtom },
			});
			this.syncer.hydrate(player);

			ServerEvents.click.connect((clickedPlayer) => {
				if (clickedPlayer === player) {
					const currentClicks = clicksAtom();
					clicksAtom(currentClicks + 1);
                    ServerEvents.updateClicks.fire(player, currentClicks + 1);
				}
			});
		});
        Players.PlayerRemoving.Connect((player) => {
            this.clicks.delete(player);
        })
	}
}