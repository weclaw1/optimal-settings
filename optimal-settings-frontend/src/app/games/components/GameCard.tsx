import Link from "next/link";
import Card from "@/components/Card";

type GameCardProps = {
  name: string;
  slug: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export default function GameCard({ name, image, slug }: GameCardProps) {
  const route = `/games/${slug}`;

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
