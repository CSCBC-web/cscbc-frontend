import TopHero from "@/components/HomePage/TopHero";
import FeaturedEvents from "@/components/HomePage/FeaturedEventSection";
import LatestSermon from "@/components/HomePage/LatestSermon";

export default function Home() {
  return (
    <div>
      <TopHero />
      <FeaturedEvents />
      <LatestSermon />
    </div>
    
  );
}
