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
import { Link } from "@heroui/link";

export default function NavBarDropdown(
    { name, items }: {
        name: string;
        items: {
            label: string,
            key: string,
            link: string
        }[];
    }
) {
    const router = useRouter();

    return (
        <div>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        size="lg"
                        className="flex items-center gap-2"
                    >
                        <span className="hidden sm:inline font-medium">{name}</span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions">
                    <DropdownSection>
                        {items.map((item) => (
                            
                                <DropdownItem key={item.key}>
                                    <Link color="foreground" href={item.link} >
                                        {item.label}
                                    </Link>
                                </DropdownItem>
                            
                        ))}
                    </DropdownSection>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}