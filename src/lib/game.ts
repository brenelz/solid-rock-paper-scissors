const players = ['Player 1', 'Player 2'] as const;

export type Players = typeof players[number];
export type Item = 'rock' | 'paper' | 'scissors';
export type PlayerState = {
    name: Players,
    wins: number;
    selected?: Item
}

export type Result = 'win' | 'loss' | 'tie';