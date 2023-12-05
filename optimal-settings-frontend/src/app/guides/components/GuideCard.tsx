import Link from "next/link";
import Card from "@/components/Card";
import { GuideImage } from "../types/guide-image";

type GuideCard = {
  name: string;
  slug: string;
  image: GuideImage;
};

export default function GuideCard({ name, image, slug }: GuideCard) {
  const route = `/guides/${slug}`;

  return (
    <Card image={image} bordered>
      <h2 className="card-title break-words">{name}</h2>
      <div className="card-actions">
        <Link className="btn btn-primary" href={route}>
          View
        </Link>
      </div>
    </Card>
  );
}
