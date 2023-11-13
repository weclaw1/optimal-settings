import GuideCard from "./GuideCard";
import { Guide } from "../types/guide";

type GuideCardListProps = {
  guides: Guide[];
};

export default function GuideCardList({ guides }: GuideCardListProps) {
  if (guides.length === 0) {
    return <p className="m-4">No guides found</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      {guides.map((guide) => (
        <GuideCard key={guide.id} {...guide} />
      ))}
    </div>
  );
}
