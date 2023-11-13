import FilterableGuideList from "./components/FilterableGuideList";
import guides from "./data/guides.json";

export default function Guides({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialFilterText = searchParams["search"] as string | undefined;
  return (
    <div className="min-h-screen mx-auto">
      <FilterableGuideList
        guides={guides}
        initialFilterText={initialFilterText}
      />
    </div>
  );
}
