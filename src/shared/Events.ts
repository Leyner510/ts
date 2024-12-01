import { Networking } from "@flamework/networking";
import type { Atom } from "@rbxts/charm";
import type CharmSync from "@rbxts/charm-sync";

interface ClientToServerEvents {
	click: () => void;
	hydrate: () => CharmSync.SyncPayload<{
		clicks: Atom<number>;
	}>;
}

interface ServerToClientEvents {
	updateAtoms: (payload: CharmSync.SyncPayload<{
		clicks: Atom<number>;
	}>[]) => void;
}

const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();

export const ClientEvents = GlobalEvents.createClient({});
export const ServerEvents = GlobalEvents.createServer({});
