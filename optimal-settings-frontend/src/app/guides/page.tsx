import camelcaseKeys from "camelcase-keys";
import FilterableGuideList from "./components/FilterableGuideList";
import { Guide } from "./types/guide";

async function getGuides(): Promise<Guide[]> {
  const res = await fetch(`${process.env.BACKEND_URL}/guides`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const guides = await res.json();
  const parsedGuides = Guide.array().parse(
    camelcaseKeys(guides, { deep: true }),
  );

  return parsedGuides.map((guide) => ({
    ...guide,
    image: {
      ...guide.image,
      src: `${process.env.PUBLIC_BACKEND_URL}${guide.image.src}`,
    },
  }));
}

export default async function Guides({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const initialFilterText = searchParams["search"] as string | undefined;
  const guides = await getGuides();
  return (
    <FilterableGuideList
      guides={guides}
      initialFilterText={initialFilterText}
    />
  );
}
