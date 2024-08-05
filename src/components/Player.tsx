import { Item, PlayerState } from "~/lib/game";

type PlayerProps = {
    player: PlayerState,
    select: (selected: Item) => void
}

export default function Player(props: PlayerProps) {
    return (
        <div class="flex flex-col gap-2 flex-1">
            <h2>{props.player.name} - ({props.player.wins} wins)</h2>
            <div class="flex gap-8">
                <button
                    disabled={!!props.player.selected}
                    class={`text-3xl ${props.player.selected === 'rock' ? 'border-2 border-slate-500' : 'border-2 border-transparent'}`}
                    onClick={() => {
                        props.select('rock');
                    }}
                >🪨</button>
                <button
                    disabled={!!props.player.selected}
                    class={`text-3xl ${props.player.selected === 'paper' ? 'border-2 border-slate-500' : 'border-2 border-transparent'}`}
                    onClick={() => {
                        props.select('paper');
                    }}
                >📄</button>
                <button
                    disabled={!!props.player.selected}
                    class={`text-3xl ${props.player.selected === 'scissors' ? 'border-2 border-slate-500' : 'border-2 border-transparent'}`}
                    onClick={() => {
                        props.select('scissors');
                    }}
                >✂️</button>
            </div>
        </div>
    )
}