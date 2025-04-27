import { useTranslations } from "next-intl";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";

export default function TopHero() {
  const t = useTranslations("HomePage");

  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex max-w-4xl flex-col text-center justify-center align-items-center">
        <span className={title()}>{t("top_hero.title")}</span>
        <br />

        <div className={subtitle({ class: "max-w-3xl mt-4 text-left" })}>
          {t("top_hero.description")}
        </div>
      </div>
      <div className="flex gap-3">
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/about/newComer"
        >
          {t("top_hero.button_new_guest")}
        </Link>
        <Link
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href="/events"
        >
          {/* <GithubIcon size={20} /> */}
          {t("top_hero.button_events")}
        </Link>
      </div>
    </section>
  );
}
