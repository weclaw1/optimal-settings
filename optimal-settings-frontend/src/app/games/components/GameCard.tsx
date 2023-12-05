import Link from "next/link";
import Card from "@/components/Card";
import { GameImage } from "../types/game-image";

type GameCard = {
  name: string;
  slug: string;
  image: GameImage;
};

export default function GameCard({ name, image, slug }: GameCard) {
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
