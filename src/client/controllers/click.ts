import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ClientEvents } from "shared/events";
import { atom } from "@rbxts/charm";
import { Players } from "@rbxts/services";
import CharmSync from "@rbxts/charm-sync";
import { DataStoreService } from "@rbxts/services";

@Controller({})
export class Click implements OnStart {
	private clickAtom = atom<number>(0);
	private dataStore = DataStoreService.GetDataStore("PlayerClicks");

	public async onStart() {
	 	const player = Players.LocalPlayer;

		const key = `Player_${player.UserId}`;
		const [savedClicks, _] = await this.dataStore.GetAsync(key);
		if (savedClicks !== undefined) {
			this.clickAtom(savedClicks as number);
		}
 
		const syncer = CharmSync.client({
			atoms: { clicks: this.clickAtom },
		});

		ClientEvents.updateClicks.connect((clicks) => {
			this.clickAtom.(clicks);
			print(`Your clicks is ${clicks}`);
		});

		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

			const currentClicks = this.clickAtom.get();
			this.clickAtom.set(currentClicks + 1);

			ClientEvents.click.fire();
		});
		player.AncestryChanged.Connect((_, parent) => {
			if (parent === undefined) {
				this.saveClicks();
			}
		});
		}
 
		private async saveClicks() {
			const player = Players.LocalPlayer;
			const key = `Player_${Players.LocalPlayer.UserId}`;
			const clicks = this.clickAtom();
			await this.dataStore.SetAsync(key, clicks);
		}
	
	}
  
	// UserInputService.InputBegan.Connect((input) => {
		// 	if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

		// 	ClientEvents.click.fire();
		// });

		// ClientEvents.updateClicks.connect((clicks) => {
		// 	print(`your clicks is ${clicks}`)
		// })