const PlayerService = game.GetService("Players");

PlayerService.PlayerAdded.Connect((player) => {
	print(`Player ${player.Name} joined the server!`);
});
