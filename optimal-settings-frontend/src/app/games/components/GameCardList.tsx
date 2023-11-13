import GameCard from "./GameCard";
import { Game } from "../types/game";

type GameCardListProps = {
  games: Game[];
};

export default function GameCardList({ games }: GameCardListProps) {
  if (games.length === 0) {
    return <p className="m-4">No games found</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
