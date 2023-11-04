import NavigationMenu from "./NavigationMenu";

type NavigationProps = {
  children: React.ReactNode;
  title?: string;
  routes: {
    path: string;
    name: string;
  }[];
};

export default function Navigation({ children, title, routes }: NavigationProps) {
  return (
    <div className="drawer bg-base-100">
      <input id="drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full navbar bg-base-300">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          { title && <div className="px-2 mx-2">{title}</div> }
          <div className="flex-none hidden lg:block">
            <NavigationMenu routes={routes} type="horizontal"/>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <NavigationMenu routes={routes} type="vertical"/>
      </div>
    </div>
  );
}