import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { ServerEvents } from "shared/Events";
import { Players } from "@rbxts/services";

@Component()
export class PlayerComponent extends BaseComponent<{} ,Player> implements OnStart {
	private clicksAtom = atom<number>(0);
	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom },
	});

	public onStart() {
		this.syncer.connect((player, ...payloads) => {
			ServerEvents.updateAtoms.fire(player, payloads);
		});

		Players.PlayerAdded.Connect((player) => {
			this.clicksAtom(0);
			this.syncer.hydrate(player);
		});

        ServerEvents.click.connect(() => {
            this.clicksAtom((currentClicks) => currentClicks + 1);
        })
	}

	public hydrate() {
        this.syncer.hydrate(this.instance);
    }
}
