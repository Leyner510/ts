const PlayerService = game.GetService("Players");

PlayerService.PlayerAdded.Connect((player) => {
	print(`Игрок ${player.Name} подключился к серверу!`);

	player.CharacterAdded.Connect((character) => {
		const humanoidRootPart = character.FindFirstChild("HumanoidRootPart");
		if (humanoidRootPart?.IsA("BasePart")) {
			const position = humanoidRootPart.Position;
			print(`Позиция игрока ${player.Name}: X=${position.X}, Y=${position.Y}, Z=${position.Z}`);
		} else {
			print(`HumanoidRootPart не найден у игрока ${player.Name}`);
		}
	});
});

PlayerService.PlayerRemoving.Connect((player) => {
	print(`Игрок ${player.Name} отключился от сервера!`);
});

