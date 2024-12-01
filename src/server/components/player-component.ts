import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { ServerEvents } from "shared/Events";
import { Players } from "@rbxts/services";

@Component()
export class PlayerComponent extends BaseComponent<{}, Player> implements OnStart {
	private clicksAtom = atom(0);
	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom },
	});

	public onStart() {
		this.syncer.connect((player, ...payloads) => {
			if (player !== this.instance) return;

			ServerEvents.updateAtoms.fire(player, payloads);
		});
	}

	public incrementClicks(amount: number) {
		this.clicksAtom((currentClicks) => currentClicks + amount);
	}

	public hydrate() {
        this.syncer.hydrate(this.instance);
    }
}
