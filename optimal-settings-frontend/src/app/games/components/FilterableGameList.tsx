"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import GameCardList from "./GameCardList";
import { Game } from "../types/game";

type FilterableGameListProps = {
  initialFilterText?: string;
  games: Game[];
};

export default function FilterableGameList({
  games,
  initialFilterText = "",
}: FilterableGameListProps) {
  const [filterText, setFilterText] = useState(initialFilterText);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(event) => setFilterText(event.target.value)}
      />
      <GameCardList
        games={games.filter((game) =>
          game.name.toLowerCase().includes(filterText.toLowerCase()),
        )}
      />
    </div>
  );
}
