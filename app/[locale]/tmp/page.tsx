import SermonFilter from "@/components/Sermons/filter"
import { getFilteredSermonsMeta } from "@/lib/sermons";

export default async function testPage(props: {
  params: Promise <{ locale: string }>;
  searchParams: Promise<{ 
    categories: string | undefined; 
    speakers: string | undefined; 
    page: string | undefined}>;
}) {
  const searchParams = await props.searchParams;

  const parseArrayParam = (param?: string): string[] => {
    if (!param) return [];
    return param
      .split(',')
      .map(item => decodeURIComponent(item.trim()))
      .filter(Boolean);
  };

  const searchParamsSpeakerList = parseArrayParam(searchParams.speakers)
  const searchParamsCategoryList = parseArrayParam(searchParams.categories)
  
  if (!searchParams.page) {
    searchParams.page = "1"
  }

  const resp = await getFilteredSermonsMeta(
    Number(searchParams.page),
    searchParamsSpeakerList,
    searchParamsCategoryList
  )

  const sermonList = resp.data;
  console.log(sermonList)
  return (
    <div>
      <SermonFilter
        categories={["Luke", "Mathew"]}
        speakers={["Pastor Horn", "Joseph Li"]}
        selectedCategories={[]}
        selectedSpeakers={[]}
        // onCategoryChange={() => {}}
        // onSpeakerChange={() => {}}
      />
    </div>
  );
}