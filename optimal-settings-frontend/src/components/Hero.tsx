export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content text-center">{children}</div>
    </div>
  );
}
