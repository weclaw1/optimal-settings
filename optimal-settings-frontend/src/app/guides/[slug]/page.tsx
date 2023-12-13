import { MDXRemote } from "next-mdx-remote/rsc";
import CompareImages from "./components/CompareImages";
import { Guide } from "../types/guide";
import camelcaseKeys from "camelcase-keys";

const components = { CompareImages };

async function getGuide(slug: string): Promise<Guide> {
  const res = await fetch(`${process.env.BACKEND_URL}/guides?slug=${slug}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const guide = await res.json();
  const parsedGuide = Guide.parse(camelcaseKeys(guide, { deep: true }));

  if (!parsedGuide.content) {
    throw new Error("Guide does not have content");
  }

  parsedGuide.content = parsedGuide.content.replace(
    /\/images\//g,
    `${process.env.PUBLIC_BACKEND_URL}/images/`,
  );
  return parsedGuide;
}

export default async function GuidePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const guide = await getGuide(slug);

  return (
    <article className="prose">
      <MDXRemote source={guide.content || ""} components={components} />
    </article>
  );
}
