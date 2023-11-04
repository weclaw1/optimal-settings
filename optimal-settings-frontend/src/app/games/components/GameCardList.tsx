import GameCard from "./GameCard";

type GameCardListProps = {
  games: {
    id: string;
    name: string;
    slug: string;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  }[];
};

export default function GameCardList({ games }: GameCardListProps) {
  if (games.length === 0) {
    return (
      <p className="p-4">
        No games found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {games.map((game) => (
        <GameCard key={game.id} {...game} />
      ))}
    </div>
  );
}