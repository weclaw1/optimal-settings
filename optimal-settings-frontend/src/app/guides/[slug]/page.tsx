import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import guides from "../data/guides.json";
import CompareImages from "./components/CompareImages";

const components = { CompareImages };

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function Guide({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const guide = await fs.readFile(
    process.cwd() + `/src/app/guides/[slug]/data/${slug}.mdx`,
    "utf-8",
  );

  return (
    <article className="m-4 min-h-screen mx-auto prose">
      <MDXRemote source={guide} components={components} />
    </article>
  );
}
