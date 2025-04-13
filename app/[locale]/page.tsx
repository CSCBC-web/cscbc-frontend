import { useTranslations } from "next-intl";
//import { Link } from '@/i18n/navigation';

import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-4xl h-[50vh] flex flex-col text-center justify-center align-items-center">
        <span className={title()}>{t('top_hero_title')}</span>
        
        {/* <span className={title()}>Make&nbsp;</span> */}
        {/* <span className={title({ color: "violet" })}>beautiful&nbsp;</span> */}
        <br />
        
        <div className={subtitle({ class: "mt-4" })}>
          { t('top_hero_description')}
        </div>
  
        
      </div>
      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          {t("featuredEventsTitle")}
        </Link>
        <Link
          className={buttonStyles({ 
            color: "primary",
            radius: "full",
            variant: "shadow", 
          })}
          href={siteConfig.links.github}
        >
          {/* <GithubIcon size={20} /> */}
          {t("recentSermonTitle")}
        </Link>
      </div>
    </section>
  );
}
