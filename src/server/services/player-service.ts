import { OnStart, Service } from "@flamework/core";
import { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { ServerEvents} from "shared/Events";

@Service()
export class PlayerService implements OnStart {
	private clicksAtom = atom<number>(0);
	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom },
	});

	public onStart() {
		ServerEvents.hydrate.connect((player) => {
			this.syncer.hydrate(player);
		});

		this.syncer.connect((player, ...payloads) => {
			ServerEvents.updateAtoms.fire(player, payloads);
		})

		ServerEvents.click.connect(() => {
			this.clicksAtom((currentClicks) => currentClicks + 1);
		});
	}
}
