import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ClientEvents } from "shared/Events";
import { atom, subscribe } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";

@Controller({})
export class Click implements OnStart {
	private clickAtom = atom<number>(0);
	private syncer = CharmSync.client({
		atoms: { clicks: this.clickAtom },
	});

	public onStart() {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				ClientEvents.click.fire();
			}
		});

		ClientEvents.updateAtoms.connect((payloads) => {
			this.syncer.sync(...payloads);
		});

		ClientEvents.hydrate.fire();

		subscribe(this.clickAtom, (clicks) => {
			print(`your clicks is ${clicks}`)
		});
	}
}
