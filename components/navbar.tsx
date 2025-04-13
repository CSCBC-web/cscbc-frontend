import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import Image from 'next/image';
import clsx from "clsx";

import { useTranslations } from "next-intl";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import LanguageSwitcher from "@/components/languageSwitcher";

import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
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
    <HeroUINavbar isBordered maxWidth="full">
      <NavbarContent justify="start">
        <Image
          alt="Logo"
          src={"/images/transparent_logo_words_black.png"}
          width={360}
          height={80}
        />
      </NavbarContent>
        
      
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            {t("navbar_text_about")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            { t("navbar_text_events") }
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            { t("navbar_text_sermons") }
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            { t("navbar_text_ministries") }
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            { t("navbar_text_giving") }
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            { t("navbar_text_resources") }
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <LanguageSwitcher />
      </NavbarContent>
    </HeroUINavbar>
  );
};
