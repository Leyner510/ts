import { OnStart, Service } from "@flamework/core";
import { atom } from "@rbxts/charm";
import { Players } from "@rbxts/services";
import { ServerEvents } from "shared/events";

@Service()
export class PlayerService implements OnStart {
	private clicks: Map<Player, number> = new Map();

	public onStart() {
		ServerEvents.click.connect((player) => {
			const clicks = this.clicks.get(player) ?? 0;

			this.clicks.set(player, clicks + 1);
			ServerEvents.updateClicks.fire(player, clicks + 1);
		});
	}
}


