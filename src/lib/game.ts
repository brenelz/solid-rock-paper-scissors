export const players = ['Player 1', 'Player 2'] as const;

export type Players = typeof players[number];
export type Item = 'rock' | 'paper' | 'scissors';
export type PlayerState = {
    name: Players,
    wins: number;
    selected?: Item
}

export type Result = 'win' | 'loss' | 'tie';

export const calculateIfPlayer1Wins = (player1State: PlayerState, player2State: PlayerState): Result | null => {
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