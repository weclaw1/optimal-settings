type TableBody = {
  children: React.ReactNode;
};

export default function TableBody({ children }: TableBody) {
  return <tbody>{children}</tbody>;
}
