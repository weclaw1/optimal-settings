'use client'

import { useState } from 'react';

import SearchBar from "@/components/SearchBar";
import GameCardList from "./GameCardList";

type FilterableGameListProps = {
  initialFilterText?: string;
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

export default function FilterableGameList({ games, initialFilterText = '' }: FilterableGameListProps) {
  const [filterText, setFilterText] = useState(initialFilterText);

  return (
    <div className="p-2">
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(event) => setFilterText(event.target.value)}
      />
      <GameCardList
        games={games.filter((game) =>
          game.name.toLowerCase().includes(filterText.toLowerCase())
        )}
      />
    </div>
  );
}