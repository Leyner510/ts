import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ClientEvents } from "shared/events";
import { atom } from "@rbxts/charm";
import { Players } from "@rbxts/services";
import CharmSync from "@rbxts/charm-sync";

@Controller({})
export class Click implements OnStart {
	private clickAtom = atom<number>(0);
	private player = Players.LocalPlayer;
	private syncer = CharmSync.client({
		atoms: { clicks: this.clickAtom },
	});
	public async onStart() {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1) {
				this.incrementClicks();
			}
		});

		this.syncer.sync({ this.clickAtom }, "playerClicks");

		print(`your clicks is ${this.clickAtom()}`);

		ClientEvents.updateClicks.connect((clicks: number) => {
			this.clickAtom(clicks);
			print(`Updated clicks: ${this.clickAtom()}`);
		})
	}

	private incrementClicks(): void {
		ClientEvents.clickEvent.fire(this.player);
	}
}

// UserInputService.InputBegan.Connect((input) => {
// 	if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

// 	ClientEvents.click.fire();
// });

// ClientEvents.updateClicks.connect((clicks) => {
// 	print(`your clicks is ${clicks}`)
// })