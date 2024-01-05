import Settings from "./components/Settings";
import { Game } from "../types/game";
import { Report } from "./types/report";
import camelcaseKeys from "camelcase-keys";

async function getGame(slug: string): Promise<Game> {
  const res = await fetch(`${process.env.BACKEND_URL}/games?slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const game = await res.json();
  const parsedGame = Game.parse(camelcaseKeys(game, { deep: true }));

  return parsedGame;
}

async function getGameReports(gameId: number): Promise<Report[]> {
  const res = await fetch(
    `${process.env.BACKEND_URL}/reports?game_id=${gameId}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const reports = await res.json();
  const parsedReports = Report.array().parse(
    camelcaseKeys(reports, { deep: true }),
  );

  return parsedReports;
}

export default async function GamePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const game = await getGame(slug);
  const reports = await getGameReports(game.id);

  return <Settings game={game} reports={reports} />;
}
