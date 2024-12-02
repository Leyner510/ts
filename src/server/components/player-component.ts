import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { atom } from "@rbxts/charm";
import CharmSync from "@rbxts/charm-sync";
import { ServerEvents } from "shared/Events";
import { Players } from "@rbxts/services";

@Component()
export class PlayerComponent extends BaseComponent<{}, Player> implements OnStart {
	private clicksAtom = atom(0);
	private moneyAtom = atom(0);
	private updatesAtoms = atom(0);

	private syncer = CharmSync.server({
		atoms: { clicks: this.clicksAtom, money: this.moneyAtom, updates: this.updatesAtoms },
	});

	public onStart() {
		this.syncer.connect((player, ...payloads) => {
			if (player !== this.instance) return;

			ServerEvents.updateAtoms.fire(player, payloads);
		});
	}

	public incrementClicks(amount: number) {
		const upgrade = this.updatesAtoms()
		const moneyToAdd = 1 + upgrade;
		this.clicksAtom((currentClicks) => currentClicks + amount);
		this.moneyAtom((currentMoney) => currentMoney + moneyToAdd);
	}

	public buyUpgrade() {
		const currentMoney = this.moneyAtom()
		const currentUpgrade = this.updatesAtoms()
		const upgrateCost = 1 + currentUpgrade * 10;

		if (currentMoney >= upgrateCost) {
			this.moneyAtom((currentMoney) => currentMoney - upgrateCost);
			this.updatesAtoms((currentUpgrade) => currentUpgrade + 1);
		} else {
			print("not enough money")
		}
	}

	public hydrate() {
		this.syncer.hydrate(this.instance);
	}
}