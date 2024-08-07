import { createSignal, For, Match, Show, Switch } from "solid-js";
import Player from "./Player";
import { createStore } from "solid-js/store";
import { calculateIfPlayer1Wins, Item, players, PlayerState, Result } from "~/lib/game";

export default function RockPaperScissorsGame() {
    const [player1Wins, setPlayer1Wins] = createSignal<Result | null>(null);
    const [playerState, setPlayerState] = createStore<PlayerState[]>(players.map(player => ({
        name: player,
        wins: 0,
        selected: undefined
    })));

    const playerSelect = (index: number, selected: Item | undefined) => {
        setPlayerState(index, 'selected', selected);

        const player1Wins = calculateIfPlayer1Wins(playerState[0], playerState[1]);
        setPlayer1Wins(player1Wins);
        if (player1Wins === 'win') {
            setPlayerState(0, 'wins', (prev) => prev + 1)
        }
        if (player1Wins === 'loss') {
            setPlayerState(1, 'wins', (prev) => prev + 1)
        }
    }

    return (
        <div class="flex flex-col gap-8">
            <div class="flex gap-16">
                <For each={playerState}>
                    {(player, index) => (
                        <Player index={index()} player={player} select={playerSelect} />
                    )}
                </For>
            </div>
            <Show when={player1Wins() !== null}>
                <Switch>
                    <Match when={player1Wins() === 'win'}>
                        <p class="text-center italic">Player 1 wins!</p>
                    </Match>
                    <Match when={player1Wins() === 'loss'}>
                        <p class="text-center italic">Player 2 wins!</p>
                    </Match>
                    <Match when={player1Wins() === 'tie'}>
                        <p class="text-center italic">Tie!</p>
                    </Match>
                </Switch>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
                    setPlayerState(0, 'selected', undefined);
                    setPlayerState(1, 'selected', undefined);
                    setPlayer1Wins(null);
                }}>Start New Game</button>
            </Show>
        </div>
    )
}