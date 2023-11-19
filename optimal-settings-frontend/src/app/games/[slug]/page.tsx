import games from "../data/games.json";
import gameDetails from "./data/game-details.json";
import { GameDetails } from "./types/game-details";
import Settings from "./components/Settings";

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default function Game({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const game = (gameDetails as { [key: string]: GameDetails })[slug];

  if (!game) {
    throw new Error(`No game found for slug: ${slug}`);
  }

  return <Settings gameDetails={game} />;
}
