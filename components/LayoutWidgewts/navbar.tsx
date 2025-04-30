import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import Image from "next/image";
import { Button } from "@heroui/button";
import { useTranslations } from "next-intl";

import LanguageSwitcher from "@/components/LayoutWidgewts/languageSwitcher";
import NavBarDropdown from "@/components/LayoutWidgewts/navBarDropdown";

import NavDropdown from "./navDropdown";


export const Navbar = () => {
  const t = useTranslations("Header");

  const items = [
      {
        key: "about",
        label: t("about_menu_text_about_us"),
        link: "/about",
      },
      {
        key: "newComer",
        label: t("about_menu_text_new_to_cscbc"),
        link: "/about/newComer",
      },
      {
        key: "events",
        label: t("navbar_text_events"),
        link: "/events",
      },
      {
        key: "sermons",
        label: t("navbar_text_sermons"),
        link: "/sermons",
      },
      {
        key: "ministries",
        label: t("navbar_text_ministries"),
        link: "/ministries",
      },
    ]

  return (
    <HeroUINavbar isBordered maxWidth="2xl">
      <NavbarContent className="hidden md:flex gap-4" justify="start">
        <Link href="/">
          <Image
            alt="Logo"
            height={60}
            src={"/images/transparent_logo_words_black.png"}
            width={300}
          />
        </Link>
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-0 md:gap-2" justify="center">
        <NavbarItem>
          <NavBarDropdown
            items={[
              {
                label: `${t("about_menu_text_about_us")}`,
                key: "about",
                link: "/about",
              },
              {
                label: `${t("about_menu_text_new_to_cscbc")}`,
                key: "new",
                link: "/about/newComer",
              },
              {
                label: `${t("about_menu_text_contact")}`,
                key: "contact",
                link: "/about/contact",
              },
            ]}
            name={t("navbar_text_about")}
          />
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/events">
            <Button
              className="flex items-center gap-2"
              size="lg"
              variant="light"
            >
              <span className="font-medium">
              {t("navbar_text_events")}
              </span>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/sermons">
            <Button
              className="flex items-center gap-2"
              size="lg"
              variant="light"
            >
              <span className="font-medium">
                {t("navbar_text_sermons")}
              </span>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <NavBarDropdown
            items={[
              {
                label: `${t("ministries_menu_text_family")}`,
                key: "ministries-family",
                link: "/ministries/families",
              },
              {
                label: `${t("ministries_menu_text_children_n_youth")}`,
                key: "ministries-children",
                link: "/ministries/children",
              },
              {
                label: `${t("ministries_menu_text_sisterhood")}`,
                key: "ministries-sisterhood",
                link: "/ministries/sisterhood",
              },
              {
                label: `${t("ministries_menu_text_young_professionals")}`,
                key: "ministries-young-professionals",
                link: "/ministries/youngProfessionals",
              },
              {
                label: `${t("ministries_menu_text_students")}`,
                key: "ministries-students",
                link: "/ministries/students",
              },
            ]}
            name={t("navbar_text_ministries")}
          />
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/giving">
            <Button
              className="flex items-center gap-2"
              size="lg"
              variant="light"
            >
              <span className="font-medium">
                {t("navbar_text_giving")}
              </span>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <NavBarDropdown
            items={[
              {
                label: `${t("resources_menu_text_english_classes")}`,
                key: "resources-eng-class",
                link: "/resources/englishClass",
              },
              {
                label: `${t("resources_menu_text_sunday_school")}`,
                key: "resources-sunday-school",
                link: "/resources/sundaySchool",
              },
              {
                label: `${t("resources_menu_text_bible_reading")}`,
                key: "resources-bible-reading",
                link: "/resources/bibleReading",
              },
              {
                label: `${t("resources_menu_text_reimbursement")}`,
                key: "resources-reimbursement",
                link: "/resources/reimbursement",
              },
            ]}
            name={t("navbar_text_resources")}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="flex md:hidden" justify="center">
        <NavDropdown items={items}/>
      </NavbarContent>

      <NavbarContent justify="end">
        <LanguageSwitcher />
      </NavbarContent>
    </HeroUINavbar>
  );
};
