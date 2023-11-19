export default function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero h-full">
      <div className="hero-content text-center">{children}</div>
    </div>
  );
}
