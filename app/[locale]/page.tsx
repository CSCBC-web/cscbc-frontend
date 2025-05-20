export const runtime = 'edge';

import TopHero from "@/components/HomePage/TopHero";
import FeaturedEvents from "@/components/HomePage/FeaturedEventSection";
import LatestSermon from "@/components/HomePage/LatestSermon";

export default async function Home(props: { 
  params: Promise<{ locale: string }>; 
}) {
  const params = await props.params;
  const locale = params.locale;
  return (
    <div>
      <TopHero />
      <FeaturedEvents locale={locale}/>
      <LatestSermon locale={locale}/>
    </div>
  );
}
