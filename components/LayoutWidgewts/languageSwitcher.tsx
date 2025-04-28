"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, ButtonGroup } from "@heroui/button";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@heroui/dropdown";
import { LanguageIcon } from "../icons";

export default function LanguageSwitcher() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLanguageChange = (lang: string) => {
        const currentPath = window.location.pathname;
        const currentSearch = window.location.search;
        const newPath = currentPath.replace(/^\/([^\/]+)(\/|$)/, `/${lang}$2`);
        router.push(newPath+currentSearch);
        handleClose();
    };

    const [currentLocale, setCurrentLocale] = useState<string>("en");
    useEffect(() => {
        const locale = window.location.pathname.split("/")[1];
        setCurrentLocale(locale);
    }, []);

    const items = [
        {
            "key": "en",
            "label": "English"
        },
        {
            "key": "zh",
            "label": "简体中文"
        },
        {
            "key": "zh-Hant",
            "label": "繁體中文"
        }
    ]
    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button variant="light">
                        <LanguageIcon />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                    {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === "delete" ? "text-danger" : ""}
                        color={item.key === "delete" ? "danger" : "default"}
                        onClick={() => handleLanguageChange(item.key)}
                    >
                        <span className="hidden sm:inline">
                            {item.key === currentLocale ? "✓" : ""}
                            {item.label}
                        </span>
                    </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}