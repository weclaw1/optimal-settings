import Link from "next/link";

type NavigationMenu = {
  routes: {
    path: string;
    name: string;
  }[];
  type?: "horizontal" | "vertical";
};

export default function NavigationMenu({
  routes,
  type = "horizontal",
}: NavigationMenu) {
  const classes =
    type === "horizontal"
      ? "menu-horizontal"
      : "p-4 w-80 min-h-full bg-base-200";
  const links = routes.map((route) => (
    <li key={route.path}>
      <Link href={route.path}>{route.name}</Link>
    </li>
  ));
  return <ul className={`menu ${classes} gap-2`}>{links}</ul>;
}
