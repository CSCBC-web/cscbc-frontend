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

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};
export const Navbar = () => {
  const t = useTranslations("Header");

  return (
    <HeroUINavbar isBordered maxWidth="2xl">
      <NavbarContent justify="start">
        <Link href="/">
          <Image
            alt="Logo"
            height={60}
            src={"/images/transparent_logo_words_black.png"}
            width={300}
          />
        </Link>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
                link: "/newComer",
              },
              {
                label: `${t("about_menu_text_contact")}`,
                key: "contact",
                link: "/contact",
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
              <span className="hidden sm:inline font-medium">
                {t("navbar_text_events")}
              </span>
            </Button>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="sermons">
            <Button
              className="flex items-center gap-2"
              size="lg"
              variant="light"
            >
              <span className="hidden sm:inline font-medium">
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
          <Link color="foreground" href="giving">
            <Button
              className="flex items-center gap-2"
              size="lg"
              variant="light"
            >
              <span className="hidden sm:inline font-medium">
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
                label: `${t("resources_menu_text_reimbursement")}`,
                key: "resources-reimbursement",
                link: "/resources/reimbursement",
              },
            ]}
            name={t("navbar_text_resources")}
          />
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <LanguageSwitcher />
      </NavbarContent>
    </HeroUINavbar>
  );
};
