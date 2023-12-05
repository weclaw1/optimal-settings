import GuideCard from "./GuideCard";
import { Guide } from "../types/guide";

type GuideCardList = {
  guides: Guide[];
};

export default function GuideCardList({ guides }: GuideCardList) {
  if (guides.length === 0) {
    return <p className="m-4">No guides found</p>;
  }

  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {guides.map((guide) => (
        <GuideCard key={guide.id} {...guide} />
      ))}
    </div>
  );
}
