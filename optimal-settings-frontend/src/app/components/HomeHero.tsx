import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import { search } from "../actions";

export default function HomeHero() {
  return (
    <Hero>
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">Tired of tweaking your game settings?</h1>
        <p className="py-6">Find optimal settings for your favorite games or learn what the graphic settings in games do by using our guides.</p>
        <SearchBar
          placeholder="Search for a game" 
          submitButton={{
            text: "Search"
          }}
          onSearch={search}
        />
      </div>
    </Hero>
  );
}