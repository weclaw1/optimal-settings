import GameCard from "./GameCard";
import { Game } from "../types/game";

type GameCardList = {
  games: Game[];
};

export default function GameCardList({ games }: GameCardList) {
  if (games.length === 0) {
    return <p className="m-4">No games found</p>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}
