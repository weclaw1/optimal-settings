"use client";

import { useState } from "react";

import SearchBar from "@/components/SearchBar";
import GuideCardList from "./GuideCardList";
import { Guide } from "../types/guide";

type FilterableGuideList = {
  initialFilterText?: string;
  guides: Guide[];
};

export default function FilterableGuideList({
  guides,
  initialFilterText = "",
}: FilterableGuideList) {
  const [filterText, setFilterText] = useState(initialFilterText);

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        filterText={filterText}
        onFilterTextChange={(event) => setFilterText(event.target.value)}
      />
      <GuideCardList
        guides={guides.filter((guide) =>
          guide.name.toLowerCase().includes(filterText.toLowerCase()),
        )}
      />
    </div>
  );
}
