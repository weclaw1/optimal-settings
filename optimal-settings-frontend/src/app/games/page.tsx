import camelcaseKeys from "camelcase-keys";
import FilterableGameList from "./components/FilterableGameList";

import { Game } from "./types/game";

async function getGames(): Promise<Game[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/games`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const games = await res.json();
  const parsedGames = Game.array().parse(camelcaseKeys(games, { deep: true }));

  return parsedGames.map((game) => ({
    ...game,
    image: {
      ...game.image,
      src: `${process.env.BACKEND_URL}${game.image.src}`,
    },
  }));
}

export default async function Games({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialFilterText = searchParams["search"] as string | undefined;
  const games = await getGames();
  return (
    <FilterableGameList games={games} initialFilterText={initialFilterText} />
  );
}
