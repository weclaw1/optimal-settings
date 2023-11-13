import FilterableGameList from "./components/FilterableGameList";

import games from "./data/games.json";

export default function Games({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialFilterText = searchParams["search"] as string | undefined;
  return (
    <div className="min-h-screen mx-auto">
      <FilterableGameList games={games} initialFilterText={initialFilterText} />
    </div>
  );
}
