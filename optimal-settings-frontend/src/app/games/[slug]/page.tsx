import games from "../data/games.json";
import gameDetails from "./data/game-details.json";

export async function generateStaticParams() {
  return games.map((game) => ({
    slug: game.slug,
  }))
}

type GameDetails = {
  id: string;
  name: string;
  slug: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  settings: {
    high?: {
      [key: string]: string;
    };
    medium?: {
      [key: string]: string;
    };
    low?: {
      [key: string]: string;
    };
    additionalInformation?: string;
  };
  settingsSources: {
    low?: string;
    medium?: string;
    high?: string;
  }
};

export default function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const game = (gameDetails as {[key: string]: GameDetails})[slug];

  if (!game) {
    throw new Error(`No game found for slug: ${slug}`);
  }

  return (
    <div className="min-h-screen mx-auto">
      <h1>{game.name}</h1>
    </div>
  );
}