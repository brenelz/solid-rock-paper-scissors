import { createEffect, createMemo, createSignal, Match, Show, Switch } from "solid-js";
import Player from "./Player";
import { createStore } from "solid-js/store";
import { Item, PlayerState, Result } from "~/lib/game";

export default function RockPaperScissorsGame() {
    const calculateIfPlayer1Wins = (player1State: PlayerState, player2State: PlayerState) => {

        if (!player1State.selected || !player2State.selected) {
            return null;
        }

        if (player1State.selected === 'rock' && player2State.selected === 'scissors') {
            return 'win';
        }

        if (player1State.selected === 'paper' && player2State.selected === 'rock') {
            return 'win';
        }

        if (player1State.selected === 'scissors' && player2State.selected === 'paper') {
            return 'win';
        }

        if (player1State.selected === player2State.selected) {
            return 'tie';
        }

        return 'loss';
    }

    const currentPlayer = 'Player 1';
    const [player1State, setPlayer1State] = createStore<PlayerState>({
        name: 'Player 1',
        wins: 0,
    })
    const [player2State, setPlayer2State] = createStore<PlayerState>({
        name: 'Player 2',
        wins: 0,
    });
    const [player1Wins, setPlayer1Wins] = createSignal<Result | null>(null);

    const player1Select = (selected: Item | undefined) => {
        setPlayer1State({
            ...player1State,
            selected
        })

        const player1Wins = calculateIfPlayer1Wins(player1State, player2State);
        setPlayer1Wins(player1Wins);
        if (player1Wins === 'win') {
            setPlayer1State('wins', player1State.wins + 1)
        }
        if (player1Wins === 'loss') {
            setPlayer2State('wins', player2State.wins + 1)
        }
    }

    const player2Select = (selected: Item | undefined) => {
        setPlayer2State({
            ...player2State,
            selected
        })

        const player1Wins = calculateIfPlayer1Wins(player1State, player2State);
        setPlayer1Wins(player1Wins);
        if (player1Wins === 'win') {
            setPlayer1State('wins', player1State.wins + 1)
        }
        if (player1Wins === 'loss') {
            setPlayer2State('wins', player2State.wins + 1)
        }
    }

    return (
        <div class="flex flex-col gap-8">
            <div class="flex gap-16">
                <Player player={player1State} select={player1Select} />
                <Player player={player2State} select={player2Select} />
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
                    player1Select(undefined);
                    player2Select(undefined);
                }}>Start New Game</button>
            </Show>
        </div>
    )
}