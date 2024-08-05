import RockPaperScissorsGame from "~/components/RockPaperScissorsGame";

export default function Home() {
  return (
    <div class="mx-auto max-w-xl flex flex-col gap-8 p-8">
      <h1 class="text-3xl font-bold text-center">Rock, Paper, Scissors</h1>
      <RockPaperScissorsGame />
    </div>
  );
}
